<template>
  <div class="relative w-full h-full">
    <!-- Map Toolbar -->
    <MapToolbar 
      :is-editing="props.isEditing" 
      :is-creating-segment="isCreatingSegment"
      @toggle-creating="toggleCreatingSegment"
      @toggle-segments="$emit('toggle-segments')"
      @back="handleBackAction"
    />

    <!-- Map Container -->
    <div id="map" class="w-full h-full rounded-lg shadow-inner"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, computed, shallowRef } from 'vue'
import L from 'leaflet'
import 'leaflet-gpx'
import 'leaflet-routing-machine'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'
import { useMapStore } from '../../stores/MapStore'
import { Segment } from '@/model/Segment'
import { getColorBySlope, getElevationData } from '@/utils/GpxUtils'
import MapToolbar from './MapToolbar.vue'

// State
const map = shallowRef<L.Map | null>(null)
const mapStore = useMapStore()
const gpxLayer = shallowRef<any>(null)
const slopeLayers = shallowRef<L.Polyline[]>([])
const routingControls = shallowRef<any[]>([])

// Logic for segment creation
const isCreatingSegment = ref(false)
const startPoint = ref<L.LatLng | null>(null)
const startMarker = shallowRef<L.Marker | null>(null)
const endMarker = shallowRef<L.Marker | null>(null)

const gpxFile = computed(() => mapStore.getGpxFile)

const props = defineProps<{
  isEditing: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle-segments'): void
}>()

onMounted(() => {
  initMap()
  if(gpxFile.value) {
    loadGPX(gpxFile.value)
  }
})

watch(
  gpxFile,
  (newGpxFile) => loadGPX(newGpxFile)
)

// Synchroniser la carte avec le store
watch(() => mapStore.getSegments.length, (newLength, oldLength) => {
    if (newLength < oldLength) {
        const lastControl = routingControls.value.pop();
        if (lastControl && map.value) {
            map.value.removeControl(lastControl);
        }
    }
});

onBeforeUnmount(() => {
  if (map.value) {
    map.value.remove()
  }
})

const initMap = () => {
  map.value = L.map('map', {
    zoomControl: false // Déplacer ou masquer pour laisser la place à la barre d'outils
  }).setView([47.35, 0.79], 13)
  
  // Ajouter le contrôle de zoom en haut à droite pour ne pas gêner notre toolbar
  L.control.zoom({ position: 'topright' }).addTo(map.value)

  setTimeout(() => {
    map.value?.invalidateSize()
  }, 100)
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19
  }).addTo(map.value as L.Map)

  map.value.on('click', (e: L.LeafletMouseEvent) => {
    if (isCreatingSegment.value) {
      handleMapClick(e.latlng)
    }
  })
}

const toggleCreatingSegment = () => {
  isCreatingSegment.value = !isCreatingSegment.value
  if (!isCreatingSegment.value) {
    resetCreationState()
  }
}

const handleMapClick = (latlng: L.LatLng) => {
  const closestPoint = getClosestGpxPointFromCoordonnee(latlng)
  if (!closestPoint) return

  if (!startPoint.value) {
    // Premier clic : Début
    startPoint.value = closestPoint
    startMarker.value = L.marker(closestPoint, {
      icon: L.divIcon({
        className: 'custom-marker-start',
        html: `<div class="w-6 h-6 bg-green-500 border-4 border-white rounded-full shadow-lg"></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      })
    }).addTo(map.value!)
  } else {
    // Deuxième clic : Fin
    const endPoint = closestPoint
    endMarker.value = L.marker(endPoint, {
      icon: L.divIcon({
        className: 'custom-marker-end',
        html: `<div class="w-6 h-6 bg-red-500 border-4 border-white rounded-full shadow-lg"></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      })
    }).addTo(map.value!)

    createAndDrawSegment(startPoint.value, endPoint)
    
    // Attendre un peu pour laisser voir le point final avant de nettoyer
    setTimeout(() => {
      resetCreationState()
      isCreatingSegment.value = false
    }, 500)
  }
}

const resetCreationState = () => {
  startPoint.value = null
  if (startMarker.value && map.value) {
    map.value.removeLayer(startMarker.value)
  }
  if (endMarker.value && map.value) {
    map.value.removeLayer(endMarker.value)
  }
  startMarker.value = null
  endMarker.value = null
}

const handleBackAction = () => {
  if (startPoint.value) {
    // Si on est en train de créer (point de départ posé), on annule juste le point
    resetCreationState()
    isCreatingSegment.value = false
  } else {
    // Sinon on retire le dernier segment créé
    deleteLastSegment()
  }
}

const loadGPX = (file: File | null) => {
  if (!map.value) return

  if (gpxLayer.value) {
    map.value.removeLayer(gpxLayer.value)
    gpxLayer.value = null
  }

  slopeLayers.value.forEach((l) => map.value!.removeLayer(l))
  slopeLayers.value = []
  
  routingControls.value.forEach((c: any) => map.value!.removeControl(c))
  routingControls.value = []

  if (!file) return

  const url = URL.createObjectURL(file)

  // @ts-ignore
  gpxLayer.value = new L.GPX(url, {
    async: true,
    polyline_options: { opacity: 0 },
    marker_options: {
      startIconUrl: '', // On masque les drapeaux par défaut pour plus de clarté
      endIconUrl: '',
      shadowUrl: ''
    }
  })

  gpxLayer.value.on('loaded', (e: any) => {
    map.value!.fitBounds(gpxLayer.value.getBounds())
    drawSlopeColors(e.target)
  })

  gpxLayer.value.addTo(map.value)

  if (mapStore.getSegments.length > 0) {
    for (const segment of mapStore.getSegments) {
      drawSegmentOnMap(segment)
    }
  }

  const elevationData = getElevationData(gpxLayer.value);
  if (elevationData) {
    mapStore.setElevationData(elevationData);
  }
}

const drawSlopeColors = (gpx: any) => {
  if (!map.value) return

  const layers = gpx.getLayers()
  layers.forEach((trackLayer: any) => {
    const subLayers = trackLayer.getLayers ? trackLayer.getLayers() : [trackLayer]
    subLayers.forEach((segLayer: any) => {
      const latlngs: L.LatLng[] = segLayer.getLatLngs ? segLayer.getLatLngs() : []
      if (latlngs.length < 2) return

      for (let i = 0; i < latlngs.length - 1; i++) {
        const p1 = latlngs[i] as any
        const p2 = latlngs[i + 1] as any
        const slope = getSlopeFromGpxPoint(p1, p2);
        const color = getColorBySlope(slope)

        const polyline = L.polyline([p1, p2], {
          color,
          weight: 4,
          opacity: color === '#22c55e' ? 0.4 : 0.8
        })

        polyline.addTo(map.value as L.Map)
        slopeLayers.value.push(polyline)
      }
    })
  })
}

const getSlopeFromGpxPoint = (p1: any, p2: any) => {
  if (!p1 || !p2 || !map.value) return 0
  const ele1: number = p1?.meta?.ele ?? 0
  const ele2: number = p2?.meta?.ele ?? 0
  const dist2D = map.value.distance(p1, p2)
  return dist2D > 0 ? ((ele2 - ele1) / dist2D) * 100 : 0
}

const getClosestGpxPointFromCoordonnee = (coord: L.LatLng): L.LatLng | null => {
  if (!map.value || !gpxLayer.value) return null

  let closestPoint: L.LatLng | null = null
  let closestDistance = Infinity

  const findInLayer = (layer: any) => {
    if (layer.getLatLngs) {
      const latlngs = layer.getLatLngs()
      const pts = Array.isArray(latlngs[0]) ? latlngs.flat(2) : latlngs
      
      pts.forEach((p: any) => {
        if (!p) return
        const distance = map.value!.distance(coord, p)
        if (distance < closestDistance) {
          closestDistance = distance
          closestPoint = p
        }
      })
    } else if (layer.eachLayer) {
      layer.eachLayer((child: any) => findInLayer(child))
    }
  }

  findInLayer(gpxLayer.value)
  return closestPoint
}

const createAndDrawSegment = async (start: L.LatLng, end: L.LatLng) => {
  try {
    if (!map.value) return

    const startOnGpx = getClosestGpxPointFromCoordonnee(start)
    const endOnGpx = getClosestGpxPointFromCoordonnee(end);

    if (!startOnGpx || !endOnGpx) return

    const slope = getSlopeFromGpxPoint(startOnGpx, endOnGpx)
    const distance = map.value.distance(start, end)
    
    const segment: Segment = Segment.createFromMap(startOnGpx, endOnGpx, distance, slope);
    mapStore.addSegment(segment)
    drawSegmentOnMap(segment)
  } catch (error) {
    console.error('Erreur lors de la création du segment:', error)
  }
}

const drawSegmentOnMap = (segment: Segment) => {
  if (!map.value) return
  
  const color = getColorBySlope(Math.abs(segment.slope))
  
  const control = (L as any).Routing.control({
    waypoints: [
      L.latLng(segment.getStart().getLat(), segment.getStart().getLng()),
      L.latLng(segment.getEnd().getLat(), segment.getEnd().getLng())
    ],
    routeWhileDragging: false,
    show: false,
    addWaypoints: false,
    lineOptions: {
      styles: [{ color: color, opacity: 0.9, weight: 6 }]
    },
    createMarker: () => null // Ne pas créer de marqueurs de route auto-générés
  }).addTo(map.value as L.Map)

  routingControls.value.push(control)
}

const deleteLastSegment = () => {
  mapStore.removeLastSegment();
}

</script>

<style scoped>
#map {
  z-index: 0;
}

/* Animations transition pour les boutons */
button {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>


<template>
  <div>
    <button class="bg-white rounded-full p-2 fixed top-30 left-4 z-40 shadow-md hover:bg-stone-100 transition-colors" @click="deleteLastSegment()">
      <img src="@/assets/images/icones/undo.png" alt="Annuler" class="w-8 h-8" />
    </button>
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


// State
const map = shallowRef<L.Map | null>(null)
const points = ref<L.LatLng[]>([])
const segments = ref<Segment[]>([])
const mapStore = useMapStore()
const gpxLayer = shallowRef<any>(null)
const slopeLayers = shallowRef<L.Polyline[]>([])
const routingControls = shallowRef<any[]>([])

const gpxFile = computed(() => mapStore.getGpxFile)

const props = defineProps<{
  isEditing: boolean
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

// Surveiller la suppression de segments dans le store pour synchroniser la carte
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

  // Initialiser la carte
  map.value = L.map('map').setView([47.35, 0.79], 13)
  
  // Invalider la taille pour que la carte se redessine correctement
  setTimeout(() => {
    map.value?.invalidateSize()
  }, 100)
  
  // Ajouter le fond de carte OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19
  }).addTo(map.value as L.Map)


  map.value.on('click', (e: L.LeafletMouseEvent) => {
    if(props.isEditing) {
          points.value.push(e.latlng)
    //popup(e.latlng);
    drawPath()
    }
  })
}

const loadGPX = (file: File | null) => {
  if (!map.value) return

  // Supprimer l'ancien tracé GPX
  if (gpxLayer.value) {
    map.value.removeLayer(gpxLayer.value)
    gpxLayer.value = null
  }

  // Supprimer les anciennes polylines colorées
  slopeLayers.value.forEach((l) => map.value!.removeLayer(l))
  slopeLayers.value = []
  
  // Supprimer les anciens segments tracés
  routingControls.value.forEach((c: any) => map.value!.removeControl(c))
  routingControls.value = []

  if (!file) {
    console.log('Fichier GPX réinitialisé')
    return
  }

  console.log('Chargement du fichier GPX :', file.name)

  const url = URL.createObjectURL(file)

  // @ts-ignore - leaflet-gpx plugin
  gpxLayer.value = new L.GPX(url, {
    async: true,
    polyline_options: { opacity: 0 }, // masquer le tracé par défaut
    marker_options: {
      startIconUrl: '@/assets/images/icones/drapeau.png',
      endIconUrl: '@/assets/images/icones/drapeau.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png'
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

  mapStore.setElevationData(getElevationData(gpxLayer.value)!);
}

const drawSlopeColors = (gpx: any) => {
  if (!map.value) return

  // Récupérer tous les points avec altitude de chaque track/segment
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

        // On ne dessine que les segments non-verts pour ne pas surcharger
        const polyline = L.polyline([p1, p2], {
          color,
          weight: 4,
          opacity: color === '#22c55e' ? 0.5 : 0.85
        })

        // Tooltip au clic
        //polyline.bindTooltip(`${slope.toFixed(1)}%`, { sticky: true })
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
      // Gérer les structures imbriquées d'un GPX (tracks/segments)
      const points = Array.isArray(latlngs[0]) ? latlngs.flat(2) : latlngs
      
      points.forEach((p: any) => {
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
 
const drawPath = () => {
  if (!map.value) return
  
  // Créer des segments deux à deux (1-2, 3-4, 5-6, etc.)
  const lastIndex = points.value.length - 1
  
  // Vérifier si on peut créer une nouvelle paire
  if (lastIndex >= 1 && lastIndex % 2 === 1) {
    const startPoint = points.value[lastIndex - 1]
    const endPoint = points.value[lastIndex]
    
    // Créer le segment et l'ajouter
    createAndDrawSegment(startPoint, endPoint)
  }
}

const createAndDrawSegment = async (startPoint: L.LatLng, endPoint: L.LatLng) => {
  try {
    if (!map.value) return

    // Récupérer les points les plus proches sur la trace GPX
    const startPointOnGpx = getClosestGpxPointFromCoordonnee(startPoint)
    const endPointOnGpx = getClosestGpxPointFromCoordonnee(endPoint);

    if (!startPointOnGpx || !endPointOnGpx) {
      console.warn('Erreur lors de la création du segment: Pas de point GPX trouvé à proximité.')
      return
    }

    const slope = getSlopeFromGpxPoint(startPointOnGpx, endPointOnGpx)
    const distance = map.value.distance(startPoint, endPoint)
    
    // Créer l'objet segment
    const segment: Segment = Segment.createFromMap(startPointOnGpx, endPointOnGpx, distance, slope);
    
    segments.value.push(segment)
    mapStore.addSegment(segment)
  
    // Afficher le segment sur la carte
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
    routeWhileDragging: true,
    show: false,
    addWaypoints: false,
    lineOptions: {
      styles: [{ color: color, opacity: 0.8, weight: 5 }]
    }
  }).addTo(map.value as L.Map)

  routingControls.value.push(control)
}

const deleteLastSegment = () => {
  mapStore.removeLastSegment();
  // La synchronisation de la carte se fait via le watcher sur mapStore.getSegments.length
}


</script>

<style scoped>
#map {
  z-index: 0;
}
</style>

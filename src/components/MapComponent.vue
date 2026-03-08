<template>
  <div>
    <div id="map" class="w-full h-full rounded-lg shadow-inner"></div>
  </div>
</template>

<script setup lang="ts">

import { ref, onMounted, onBeforeUnmount, watch, computed } from 'vue'
import L from 'leaflet'
import 'leaflet-gpx'
import 'leaflet-routing-machine'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'
import { useMapStore } from '../stores/MapStore'
import { Segment } from '@/model/Segment'
import { CATEGORIES } from '@/constants/categories'


// State
const map = ref<L.Map | null>(null)
const points = ref<L.LatLng[]>([])
const segments = ref<Segment[]>([])
const mapStore = useMapStore()
const gpxLayer = ref<any>(null)
const slopeLayers = ref<L.Polyline[]>([])

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
  (newGpxFile) => {
      loadGPX(newGpxFile)

  }
)

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
  }).addTo(map.value)


  map.value.on('click', (e: L.LeafletMouseEvent) => {
    if(props.isEditing) {
          points.value.push(e.latlng)
    //popup(e.latlng);
    drawPath()
    }
  })
}

const loadGPX = (file: File) => {
  console.log('Chargement du fichier GPX :', file.name)
  if (!map.value) return

  // Supprimer l'ancien tracé GPX
  if (gpxLayer.value) {
    map.value.removeLayer(gpxLayer.value)
  }

  // Supprimer les anciennes polylines colorées
  slopeLayers.value.forEach((l: L.Polyline) => map.value!.removeLayer(l))
  slopeLayers.value = []

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

        const ele1: number = p1?.meta?.ele ?? 0
        const ele2: number = p2?.meta?.ele ?? 0
        const dist2D = map.value!.distance(p1, p2)

        const slope = dist2D > 0 ? ((ele2 - ele1) / dist2D) * 100 : 0
        const color = getColorBySlope(slope)

        // On ne dessine que les segments non-verts pour ne pas surcharger
        const polyline = L.polyline([p1, p2], {
          color,
          weight: 4,
          opacity: color === '#22c55e' ? 0.5 : 0.85
        })

        // Tooltip au clic
        polyline.bindTooltip(`${slope.toFixed(1)}%`, { sticky: true })
        polyline.addTo(map.value!)
        slopeLayers.value.push(polyline)
      }
    })
  })
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
    // Récupérer les élévations
    const coords = `${startPoint.lat},${startPoint.lng}|${endPoint.lat},${endPoint.lng}`
    const response = await fetch(`https://api.open-elevation.com/api/v1/lookup?locations=${coords}`)
    const data = await response.json()
    
    const elevStart = data.results[0].elevation
    const elevEnd = data.results[1].elevation
    
    // Calculer la pente
    const elevDiff = elevEnd - elevStart
    const distance = map.value!.distance(startPoint, endPoint)
    const slope = (elevDiff / distance) * 100
    
    // Créer l'objet segment
    const segment: Segment = {
      latDebut: startPoint.lat,
      lonDebut : startPoint.lng,
      latFin :endPoint.lat,
      lonFin: endPoint.lng,
      slope: slope,
      distance: distance,
      categorie: getCategorie(slope),
      ranking: [15, 10, 5]
    }
    
    segments.value.push(segment); // to delete later
    mapStore.addSegment(segment);
    
    // Afficher le segment sur la carte
    drawSegmentOnMap(segment)
  } catch (error) {
    console.error('Erreur lors de la création du segment:', error)
  }
}

const drawSegmentOnMap = (segment: Segment) => {
  if (!map.value) return
  
  const color = getColorBySlope(Math.abs(segment.slope))
  
  L.Routing.control({
    waypoints: [
      L.latLng(segment.latDebut, segment.lonDebut),
      L.latLng(segment.latFin, segment.lonFin)
    ],
    routeWhileDragging: false,
    show: false,
    addWaypoints: false,
    lineOptions: {
      styles: [{ color: color, opacity: 0.8, weight: 5 }]
    }
  }).addTo(map.value)
}


const getColorBySlope = (slope: number): string => {
  if (slope > 10)        return '#1a1a1a'  // noir        > +10%
  if (slope > 5)         return '#ef4444'  // rouge    +5% à +10%
  if (slope > 3)         return '#eab308'  // jaune    +3% à  +5%
  if (slope >= -3)       return '#22c55e'  // vert     -3% à  +3%
  if (slope >= -5)       return '#eab308'  // jaune    -5% à  -3%
  if (slope >= -10)      return '#ef4444'  // rouge   -10% à  -5%
  return '#1a1a1a'                         // noir        < -10%
}

const getCategorie = (slope: number): string => {
  if (slope < -3) return CATEGORIES.DESCENT.code
  if (slope > 3) return CATEGORIES.MOUNTAIN.code
  return CATEGORIES.FLAT.code
}

</script>

<style scoped>
#map {
  z-index: 0;
}
</style>

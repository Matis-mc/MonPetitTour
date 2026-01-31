<template>
  <div>
    <div id="map" class="w-full h-[600px] rounded-lg shadow-inner"></div>
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


// State
const map = ref<L.Map | null>(null)
const points = ref<L.LatLng[]>([])
const segments = ref<Segment[]>([])
const mapStore = useMapStore()
const gpxLayer = ref<any>(null)

const gpxFile = computed(() => mapStore.getGpxFile)

onMounted(() => {
  initMap()
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
  
  // Ajouter le fond de carte OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19
  }).addTo(map.value)


  map.value.on('click', (e: L.LeafletMouseEvent) => {
    points.value.push(e.latlng)
    //popup(e.latlng);
    drawPath()
  })
}

const loadGPX = (file: File) => {
  console.log('Chargement du fichier GPX :', file.name)
  if (!map.value) return
  
  // Supprimer la couche GPX précédente si elle existe
  if (gpxLayer.value) {
    map.value.removeLayer(gpxLayer.value)
  }
  
  const url = URL.createObjectURL(file)
  
  // @ts-ignore - leaflet-gpx plugin
  gpxLayer.value = new L.GPX(url, {
    async: true,
    marker_options: {
      startIconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
      endIconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png'
    }
  })
  
  gpxLayer.value.on('loaded', () => {
    map.value!.fitBounds(gpxLayer.value.getBounds())
  })
  
  gpxLayer.value.addTo(map.value)
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
  if (slope < -3) return '#a81417'
  if (slope > 3) return '#a81417'
  return '#115c25'
}

const getCategorie = (slope: number): string => {
  if (slope < -3) return 'D'
  if (slope > 3) return 'M'
  return 'S'
}

</script>

<style scoped>
#map {
  z-index: 0;
}
</style>

<template>
  <div>
    <div id="map" class="w-full h-[600px] rounded-lg shadow-inner"></div>
    </div>
</template>

<script setup lang="ts">

import { ref, onMounted, onBeforeUnmount } from 'vue'
import L from 'leaflet'
import 'leaflet-gpx'
import 'leaflet-routing-machine'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'

// Interface pour un segment
interface Segment {
  startPoint: L.LatLng
  endPoint: L.LatLng
  slope: number
}

// State
const map = ref<L.Map | null>(null)
const points = ref<L.LatLng[]>([])
const segments = ref<Segment[]>([])
let polyline: L.Polyline | null = null;

onMounted(() => {
  initMap()
  // Pour le moment, on initialise juste la carte
  // Vous ajouterez loadGPX() quand vous aurez un fichier GPX
})

onBeforeUnmount(() => {
  if (map.value) {
    map.value.remove()
  }
})

const initMap = () => {


  // Initialiser la carte
  map.value = L.map('map').setView([47.35581936616119, 0.7937484150029221], 13)
  
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
      startPoint,
      endPoint,
      slope
    }
    
    segments.value.push(segment)
    
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
    waypoints: [segment.startPoint, segment.endPoint],
    routeWhileDragging: false,
    show: false,
    addWaypoints: false,
    lineOptions: {
      styles: [{ color: color, opacity: 0.8, weight: 5 }]
    }
  }).addTo(map.value)
}



const getColorBySlope = (slope: number): string => {
  // Gradient de couleur basé sur la pente en %
  if (slope < 2) return '#00FF00'    // Vert - pente très faible
  if (slope < 5) return '#FFFF00'    // Jaune - pente faible
  if (slope < 8) return '#FFA500'    // Orange - pente modérée
  if (slope < 12) return '#FF6347'   // Rouge tomate - pente forte
  return '#8B0000'                    // Rouge foncé - pente très forte
}


</script>

<style scoped>
#map {
  z-index: 0;
}
</style>

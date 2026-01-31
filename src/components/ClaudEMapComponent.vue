<template>
  <div>
    <div id="map" class="w-full h-[600px] rounded-lg shadow-inner"></div>
    
    <!-- Panel pour les segments sélectionnés -->
    <div v-if="selectedSegments.length > 0" class="mt-4 p-4 bg-blue-50 rounded-lg">
      <h3 class="text-lg font-semibold mb-2">Segments sélectionnés ({{ selectedSegments.length }})</h3>
      <ul class="space-y-2">
        <li v-for="segment in selectedSegments" :key="segment.id" class="flex justify-between items-center">
          <span class="text-sm">{{ segment.name }}</span>
          <button 
            @click="removeSegment(segment)"
            class="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
          >
            Retirer
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">

import { ref, onMounted, onBeforeUnmount } from 'vue'
import L from 'leaflet'
import 'leaflet-gpx'

// Types
interface StravaSegment {
  id: number
  name: string
  distance: number
  elevation: number
  points: string // polyline encodée
}

// State
const map = ref<L.Map | null>(null)
const gpxLayer = ref<any>(null)
const selectedSegments = ref<StravaSegment[]>([])
const segmentLayers = ref<Map<number, L.Polyline>>(new Map())

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
  // Fix pour les icônes Leaflet avec Vite
  delete (L.Icon.Default.prototype as any)._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  })

  // Initialiser la carte
  map.value = L.map('map').setView([45.5, 6.5], 13)
  
  // Ajouter le fond de carte OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19
  }).addTo(map.value)
}

const loadGPX = (gpxUrl: string) => {
  if (!map.value) return

  gpxLayer.value = new (L as any).GPX(gpxUrl, {
    async: true,
    marker_options: {
      startIconUrl: null,
      endIconUrl: null,
      shadowUrl: null
    },
    polyline_options: {
      color: 'blue',
      weight: 4,
      opacity: 0.7
    }
  }).on('loaded', (e: any) => {
    if (map.value) {
      map.value.fitBounds(e.target.getBounds())
      // Ici vous appellerez l'API Strava avec les bounds
      loadStravaSegments(e.target.getBounds())
    }
  }).addTo(map.value)
}

const loadStravaSegments = (bounds: L.LatLngBounds) => {
  // TODO: Implémenter l'appel à l'API Strava
  const boundsArray = [
    bounds.getSouth(),
    bounds.getWest(),
    bounds.getNorth(),
    bounds.getEast()
  ]
  
  console.log('Bounds pour recherche Strava:', boundsArray)
  
  // Exemple de segments fictifs pour le développement
  const mockSegments: StravaSegment[] = [
    {
      id: 1,
      name: 'Col de la Madeleine',
      distance: 5000,
      elevation: 450,
      points: ''
    }
  ]
  
  // displayStravaSegments(mockSegments)
}

const displayStravaSegments = (segments: StravaSegment[]) => {
  if (!map.value) return

  segments.forEach(segment => {
    // TODO: Décoder la polyline et créer le layer
    // Pour l'instant on crée un exemple statique
    const coordinates: L.LatLngExpression[] = [[45.5, 6.5], [45.51, 6.51]]
    
    const polyline = L.polyline(coordinates, {
      color: 'red',
      weight: 3,
      opacity: 0.6
    }).addTo(map.value!)
    
    // Rendre le segment cliquable
    polyline.on('click', () => {
      toggleSegmentSelection(segment, polyline)
    })
    
    // Ajouter un popup avec les infos
    polyline.bindPopup(`
      <div class="p-2">
        <p class="font-semibold">${segment.name}</p>
        <p class="text-sm">Distance: ${segment.distance}m</p>
        <p class="text-sm">Dénivelé: ${segment.elevation}m</p>
      </div>
    `)
    
    segmentLayers.value.set(segment.id, polyline)
  })
}

const toggleSegmentSelection = (segment: StravaSegment, polyline: L.Polyline) => {
  const index = selectedSegments.value.findIndex(s => s.id === segment.id)
  
  if (index > -1) {
    // Désélectionner
    selectedSegments.value.splice(index, 1)
    polyline.setStyle({ color: 'red', weight: 3 })
  } else {
    // Sélectionner
    selectedSegments.value.push(segment)
    polyline.setStyle({ color: 'green', weight: 5 })
  }
}

const removeSegment = (segment: StravaSegment) => {
  const polyline = segmentLayers.value.get(segment.id)
  if (polyline) {
    polyline.setStyle({ color: 'red', weight: 3 })
  }
  
  const index = selectedSegments.value.findIndex(s => s.id === segment.id)
  if (index > -1) {
    selectedSegments.value.splice(index, 1)
  }
}

// Exposer les fonctions pour les tests
defineExpose({
  loadGPX,
  displayStravaSegments
})
</script>

<style scoped>
#map {
  z-index: 0;
}
</style>

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './assets/main.css'

// Import des vues
import HomeView from './views/HomeView.vue'
import UploadGPXView from './views/tours/UploadGPXView.vue'
import ConfirmationTourView from './views/tours/ConfirmationTourView.vue'
import { createPinia } from 'pinia'
import MapView from './views/MapView.vue'
import SegmentsRankingView from './views/tours/SegmentsRankingView.vue'

const pinia = createPinia();

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/tour/upload',
      name: 'uploadGPX',
      component: UploadGPXView
    },
    {
      path: '/tour/map',
      name: 'mapTour',
      component: MapView
    },
    {
      path: '/tour/ranking',
      name: 'segmentsRanking',
      component: SegmentsRankingView
    },
    {
      path: '/tour/confirmation',
      name: 'confirmation',
      component: ConfirmationTourView
    }
  ]
})

const app = createApp(App)

app.use(router)
app.use(pinia)
app.mount('#app')

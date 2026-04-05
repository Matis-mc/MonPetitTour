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
import SearchTourView from './views/participation/SearchTourView.vue'
import ActiviteeView from './views/participation/ActiviteeView.vue'
import ResultView from './views/participation/ResultView.vue'
import CategorieRankingView from './views/participation/CategorieRankingView.vue'
import SegmentRankingView from './views/participation/SegmentRankingView.vue'
import LoginView from './views/LoginView.vue'
import StravaCallbackView from './views/StravaCallbackView.vue'
import { useAuthStore } from './stores/AuthStore'
import SelectionSegmentsRankingView from './views/tours/SelectionSegmentsRankingView.vue'

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
      path: '/tour/ranking/categorie',
      name: 'rankingcategorie',
      component: CategorieRankingView
    },
    {
      path: '/tour/ranking/segment',
      name: 'segmentranking',
      component: SegmentRankingView
    },
    {
      path: '/tour/segment/ranking',
      name: 'selectionSegmentRanking',
      component: SelectionSegmentsRankingView
    },
    {
      path: '/tour/confirmation',
      name: 'confirmation',
      component: ConfirmationTourView
    },
    {
      path: '/tour/search',
      name: 'search',
      component: SearchTourView
    },
    {
      path: '/tour/activities',
      name: 'activities',
      component: ActiviteeView
    },
    {
      path: '/tour/result',
      name: 'result',
      component: ResultView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/auth/callback',
      name: 'strava-callback',
      component: StravaCallbackView
    }
  ]
})

router.beforeEach((to, _, next) => {
  const authStore = useAuthStore()
  const publicPages = ['/login', '/auth/callback']
  const authRequired = !publicPages.includes(to.path)

  if (authRequired && !authStore.isAuthenticated) {
    return next('/login')
  }

  // Si on est déjà authentifié et qu'on va sur login, on redirige vers l'accueil
  if (authStore.isAuthenticated && to.path === '/login') {
    return next('/')
  }

  next()
})

const app = createApp(App)

app.use(router)
app.use(pinia)
app.mount('#app')

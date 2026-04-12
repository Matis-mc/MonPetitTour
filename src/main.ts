import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './assets/main.css'

// Import des vues
import HomeView from './views/home/HomeView.vue'
import UploadGPXView from './views/creation/UploadGPXView.vue'
import CreationTourConfirmationView from './views/creation/CreationTourConfirmationView.vue'
import { createPinia } from 'pinia'
import MapView from './views/creation/MapView.vue'
import SearchTourView from './views/search/SearchTourView.vue'
import ActiviteeView from './views/search/ActiviteeView.vue'
import ResultView from './views/result/ResultView.vue'
import CategorieRankingView from './views/result/CategorieRankingView.vue'
import SegmentRankingView from './views/result/SegmentRankingView.vue'
import LoginView from './views/authentification/LoginView.vue'
import StravaCallbackView from './views/authentification/StravaCallbackView.vue'
import { useAuthStore } from './stores/AuthStore'
import SelectionSegmentsRankingView from './views/creation/CreationSegmentsRankingView.vue'

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
      path: '/creation/upload',
      name: 'uploadGPX',
      component: UploadGPXView
    },
    {
      path: '/creation/map',
      name: 'mapTour',
      component: MapView
    },
    {
      path: '/result/ranking/categorie',
      name: 'rankingcategorie',
      component: CategorieRankingView
    },
    {
      path: '/result/ranking/segment',
      name: 'segmentranking',
      component: SegmentRankingView
    },
    {
      path: '/creation/segment/ranking',
      name: 'selectionSegmentRanking',
      component: SelectionSegmentsRankingView
    },
    {
      path: '/creation/confirmation',
      name: 'confirmation',
      component: CreationTourConfirmationView
    },
    {
      path: '/search/tour',
      name: 'search',
      component: SearchTourView
    },
    {
      path: '/search/activities',
      name: 'activities',
      component: ActiviteeView
    },
    {
      path: '/result/tour',
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

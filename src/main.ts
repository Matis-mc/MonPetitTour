import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './assets/main.css'

// Import des vues
import HomeView from './views/HomeView.vue'
import { createPinia } from 'pinia'

const pinia = createPinia();

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    }
  ]
})

const app = createApp(App)

app.use(router)
app.use(pinia)
app.mount('#app')

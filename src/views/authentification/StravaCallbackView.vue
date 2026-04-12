<template>
  <div class="callback-view flex flex-col items-center justify-center min-h-screen">
    <div v-if="loading" class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
      <p class="text-xl font-medium text-gray-700">Authentification en cours...</p>
    </div>
    <div v-else-if="error" class="text-center bg-white p-8 rounded-2xl shadow-lg border border-red-100 max-w-sm px-4">
      <div class="bg-red-50 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
        <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <h2 class="text-xl font-bold text-gray-900 mb-2">Erreur d'authentification</h2>
      <p class="text-gray-500 mb-6">{{ error }}</p>
      <router-link to="/login" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 transition-colors">
        Retour à la page de connexion
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/AuthStore'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  const code = route.query.code as string

  if (!code) {
    error.value = "Code d'authorisation manquant"
    loading.value = false
    return
  }

  try {
    const success = await authStore.handleCallback(code)
    if (success) {
      router.push('/')
    } else {
      error.value = "Impossible de récupérer les tokens d'accès"
    }
  } catch (err) {
    console.error(err)
    error.value = "Une erreur est survenue lors de l'authentification"
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.callback-view {
  background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
}
</style>

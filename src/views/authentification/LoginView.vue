<template>
  <div class="login-view flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
    <div class="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100">
      <div class="mb-8">
        <img src="@/assets/images/logo/logo.png" alt="Logo" class="h-20 mx-auto mb-4" />
        <h1 class="text-3xl font-extrabold text-gray-900 mb-2">Maillot Jaune</h1>
        <p class="text-gray-500">Connectez-vous avec Strava pour continuer</p>
      </div>

      <button 
        @click="login" 
        class="group relative w-full flex justify-center py-4 px-4 border border-transparent text-lg font-bold rounded-xl text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
      >
        <span class="absolute left-0 inset-y-0 flex items-center pl-3">
          <svg class="h-6 w-6 text-orange-400 group-hover:text-orange-300" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
          </svg>
        </span>
        Se connecter avec Strava
      </button>

      <div class="mt-8 pt-6 border-t border-gray-100">
        <p class="text-sm text-gray-400">
          En vous connectant, vous autorisez l'application à lire vos activités Strava.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/AuthStore'

const authStore = useAuthStore()

const login = () => {
  authStore.login()
}
</script>

<style scoped>
.login-view {
  background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
}
</style>

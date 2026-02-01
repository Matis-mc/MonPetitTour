<template>
  <div class="min-h-screen bg-amber-100">
    <header class="bg-amber-100">
      <div class="flex justify-center w-full px-2">
        <img src="@/assets/images/logo/logo.png" alt="Mon Petit Tour Logo" class="h-10"/>
      </div>
    </header>
    
    <main>
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="flex flex-col h-screen">
    <header>
      <Header />
    </header>
    
    <main class="flex-1 overflow-y-auto">
      <RouterView v-slot="{ Component }">
        <component :is="Component" class="h-full w-full" />
      </RouterView>
    </main>

    <Footer />
  </div> 
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/generics/Header.vue';
import Footer from './components/generics/Footer.vue';
</script>

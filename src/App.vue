<template>
  <div class="flex flex-col h-screen">
    <header class="fixed top-0 left-0 right-0 z-50">
      <Header />
    </header>
    
    <main class="flex-1 overflow-y-auto pt-16">
      <RouterView v-slot="{ Component }">
        <component :is="Component" class="h-full w-full" />
      </RouterView>
    </main>
    <footer class="fixed bottom-0 left-0 right-0 flex justify-center p-4 z-50">
      <Footer />
    </footer>
  </div> 
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/generics/Header.vue';
import Footer from './components/generics/Footer.vue';
</script>

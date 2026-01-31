<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-2xl font-semibold mb-4">Carte Interactive</h2>
      <MapComponent />
    </div>
  </div>
</template>

<script setup lang="ts">
import MapComponent from '@/components/MapComponent.vue'
</script>

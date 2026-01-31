<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-2xl font-semibold mb-4">Carte Interactive</h2>
      <FileInputComponent :fileType="'.gpx'" :onFileLoaded="(event) => {
        const file = event.target.files?.[0];
        if (file) {
          loadGPXFile(file);
        }
      }" />
      <MapComponent />
      <SegmentsRankingComponent/>
    </div>
  </div>
</template>

<script setup lang="ts">
import FileInputComponent from '@/components/FileInputComponent.vue';
import MapComponent from '@/components/MapComponent.vue'
import SegmentsRankingComponent from '@/components/SegmentsRankingComponent.vue';
import { useMapStore } from '@/stores/MapStore';

const mapStore = useMapStore()


const loadGPXFile = (file: File) => {
  mapStore.setGpxFile(file);
};

</script>

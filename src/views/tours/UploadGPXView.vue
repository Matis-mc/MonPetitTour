<template>
  <div class="max-w-7xl mx-auto spy-8">
    <div class="bg-amber-200 rounded-lg shadow p-2 m-2">
      <input v-model="tourStore.tourCreation.name" type="text" placeholder="Nom du tour" class="w-full p-2 mb-4 border rounded" />
      <input v-model="tourStore.tourCreation.description" type="text" placeholder="Description" class="w-full p-2 mb-4 border rounded" />
      <FileInputComponent :fileType="'.gpx'" :onFileLoaded="loadGPXFile" />
    </div>
  </div>
</template>

<script setup lang="ts">
import FileInputComponent from '@/components/FileInputComponent.vue';
import { useMapStore } from '@/stores/MapStore';
import { useTourStore } from '@/stores/tourStore';
import { useRouter } from 'vue-router';

const mapStore = useMapStore();
const router = useRouter();
const tourStore = useTourStore();

const loadGPXFile = (event: any) => {
    const file = event.target.files?.[0];
      if (file) {
        mapStore.setGpxFile(file);
        tourStore.tourCreation.gpxFile = file;
        router.push('/tour/map');
      }
};
</script>

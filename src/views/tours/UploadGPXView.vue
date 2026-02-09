<template>
  <div class="max-w-7xl mx-auto spy-8">
    <div class="bg-amber-200 rounded-lg shadow p-2 m-2">
      <FileInputComponent :fileType="'.gpx'" :onFileLoaded="loadGPXFile" />
    </div>
  </div>
</template>

<script setup lang="ts">
import FileInputComponent from '@/components/FileInputComponent.vue';
import { useMapStore } from '@/stores/MapStore';
import { useRouter } from 'vue-router';

const mapStore = useMapStore();
const router = useRouter();

const loadGPXFile = (event: any) => {
    const file = event.target.files?.[0];
      if (file) {
        mapStore.setGpxFile(file);
        router.push('/tour/map');
      }
};
</script>

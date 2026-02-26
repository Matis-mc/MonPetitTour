<template>
  <div class="w-full flex items-center justify-center">
    <div class="bg-stone-100 w-2/3 min-w-80 flex flex-col items-center rounded-2xl shadow-md p-4 m-2">
      <InputText :modelValue="tourStore.tourCreation.name" placeholder="Nom du tour"/>
      <InputText :modelValue="tourStore.tourCreation.description" placeholder="Description"/>
      <FileInputComponent :fileType="'.gpx'" :onFileLoaded="loadGPXFile" />
    </div>
  </div>
</template>

<script setup lang="ts">
import FileInputComponent from '@/components/FileInputComponent.vue';
import InputText from '@/components/generics/InputText.vue';
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

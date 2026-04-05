<template>
  <div class="w-full h-full flex items-center justify-center bg-cover bg-center bg-no-repeat" :style="{ backgroundImage: `url(${carteImage})` }">
    <div class=" bg-white w-2/3 md:w-1/5 min-w-80 flex flex-col items-center rounded-2xl shadow-md p-4 m-2">
      <h2 class="text-2xl font-bold mb-4">Tracez votre Etape</h2>
      <InputText v-model="tourStore.tourCreation.name" placeholder="Nom du tour"/>
      <InputText v-model="tourStore.tourCreation.description" placeholder="Description"/>
      <FileInputComponent :fileType="'.gpx'" :onFileLoaded="loadGPXFile" />
    </div>
  </div>
</template>

<script setup lang="ts">
import FileInputComponent from '@/components/FileInputComponent.vue';
import InputText from '@/components/generics/InputText.vue';
import { useMapStore } from '@/stores/MapStore';
import { useCreationTourStore } from '@/stores/CreationTourStore';
import { useRouter } from 'vue-router';
import carteImage from '@/assets/images/background/carte.jpg';
import { onMounted } from 'vue';

const mapStore = useMapStore();
const router = useRouter();
const tourStore = useCreationTourStore();

onMounted(() => {
    tourStore.resetTourCreation();
})

const loadGPXFile = (event: any) => {
    const file = event.target.files?.[0];
      if (file) {
        mapStore.setGpxFile(file);
        tourStore.tourCreation.gpxFile = file;
        router.push('/tour/map');
      }
};
</script>

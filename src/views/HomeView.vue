<template>
    <div class="flex bg-stone-100 flex-col mx-auto justify-items-center"
    :style="{ backgroundImage: `url(${bgImage})` }">
    <ResultTourListe :tours="tours" />
  </div>
</template>

<script setup lang="ts">
import ApiService from '@/services/ApiService';
import { onMounted, ref } from 'vue';
import bgImage from '@/assets/images/background/background-light.png';
import { TourResultat } from '@/model/TourResultat';
import ResultTourListe from '@/components/tours/ResultTourListe.vue';

let tours = ref([] as TourResultat[]);

onMounted(() => {
    ApiService.getTours().then(
        (toursFetch) => {
            console.log(toursFetch);
            tours.value = toursFetch;
        }
    );
});
    

</script>

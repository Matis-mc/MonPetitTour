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
import { mapToTourResultat } from '@/mapper/TourResultatMapper';

let tours = ref([] as TourResultat[]);

onMounted(() => {
    ApiService.getTours().then(
        (toursFetch) => {
            let tourResultats = [] as TourResultat[];
            toursFetch.forEach((t: any) => {
                tourResultats.push(mapToTourResultat(t));
                console.log("Tour récupéré : " , t);
            });
            tours.value = tourResultats;
        }
    );
});



</script>

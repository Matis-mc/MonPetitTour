<template>
    <div class="flex bg-neutral-50 flex-col mx-auto justify-items-center md:w-1/4 pb-32">
    <ResultTourListe v-if="!loading" :tours="tours"/>
    <LoaderComponent :message="'Récupération des tours...'" v-if="loading"/>
  </div>
</template>

<script setup lang="ts">
import ApiService from '@/services/ApiService';
import { onMounted, ref } from 'vue';
import { TourResultat } from '@/model/TourResultat';
import ResultTourListe from '@/components/tours/ResultTourListe.vue';
import LoaderComponent from '@/components/generics/LoaderComponent.vue';

let tours = ref([] as TourResultat[]);
const loading = ref(false);

onMounted(() => {
    loading.value = true;
    ApiService.getTours()
        .then((toursFetch) => tours.value = toursFetch)
        .finally(() => loading.value = false);
});


</script>

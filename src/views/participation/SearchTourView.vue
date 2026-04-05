<template>
    <div class="flex w-2/3 min-w-80 flex-col items-center justify-center bg-cover bg-center bg-no-repeat" :style="{ backgroundImage: `url(${bgImage})` }">
        <SearchTourComponent @searchTour="fetchTour"/>
    </div>
</template>
<script setup lang="ts">
import SearchTourComponent from '@/components/tours/SearchTourComponent.vue';
import bgImage from '@/assets/images/background/background-light.png';
import ApiService from '@/services/ApiService';
import { useResultatTourStore } from '@/stores/ResultatTourStore';
import { TourResultat } from '@/model/TourResultat';
import { useRoutingService } from '@/services/routingService';

const routingService = useRoutingService();

const store = useResultatTourStore();

const fetchTour = (codeTour: string) => {
    ApiService.getTourByCode(codeTour)
    .then((tourResultat: TourResultat) => {
        store.setTourResultat(tourResultat)
        routingService.goToActivities();
    })
    .catch((error) => {
        console.log(error);
    })
}

</script>
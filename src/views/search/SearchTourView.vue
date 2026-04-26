<template>
    <div class="flex w-2/3 min-w-80 flex-col items-center justify-center bg-cover bg-center bg-no-repeat" :style="{ backgroundImage: `url(${bgImage})` }">
        <SearchTourComponent @searchTour="fetchTour"/>
        <div v-if="messageError" class="text-red-500 text-center p-4 rounded-lg bg-red-100 absolute bottom-20">
            {{ messageError }}
        </div>
    </div>
</template>
<script setup lang="ts">
import SearchTourComponent from '@/components/tours/SearchTourComponent.vue';
import bgImage from '@/assets/images/background/background-light.png';
import ApiService from '@/services/ApiService';
import { useResultatTourStore } from '@/stores/ResultatTourStore';
import { TourResultat } from '@/model/TourResultat';
import { useRoutingService } from '@/services/RoutingService';
import { ref } from 'vue';

const routingService = useRoutingService();

const store = useResultatTourStore();

const messageError = ref("");

const fetchTour = (codeTour: string) => {

    ApiService.getTourByCode(codeTour)
        .then((tourResultat: TourResultat) => {
            store.setTourResultat(tourResultat)
            routingService.goToUploadFit();
        })
        .catch((error) => {
            messageError.value = "Impossible de trouver le tour avec le code " + codeTour;
            console.log(error);
        })
}

</script>
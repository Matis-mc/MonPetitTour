<template>
    <div class="flex flex-col gap-2 " v-for="tour in tours" :key="tour.getId()">
        <ResultTourListElement v-if="tour.getRanking().general.length > 0" :tour="tour" @click="goToResult(tour)"/>
        <OpenTourListeElement v-if="tour.getRanking().general.length === 0" :tour="tour" />
    </div>
    <div v-if="tours.length === 0" class="flex items-center w-full justify-center">
        <p class="text-stone-500 a ">Aucun tour trouvé</p>
    </div>
</template>

<script setup lang="ts">
import ResultTourListElement from './ResultTourListElement.vue';
import OpenTourListeElement from './OpenTourListeElement.vue';
import { TourResultat } from '@/model/TourResultat';
import { useResultatTourStore } from '@/stores/ResultatTourStore';
import { useRoutingService } from '@/services/routingService';

const toursResultatStore = useResultatTourStore();
const routingService = useRoutingService();

const props = defineProps({
    tours: {
        type: Array as () => TourResultat[],
        required: true
    }
});

const goToResult = (tour: TourResultat) => {
    toursResultatStore.setTourResultat(tour);
    routingService.goToResult(tour);
}
</script>
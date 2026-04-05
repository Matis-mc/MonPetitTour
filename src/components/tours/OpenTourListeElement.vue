<template>
    <div class="flex flex-col  m-2 bg-slate-100 border border-neutral-200 rounded-lg">
        <img :src="tourBanner" class="w-full h-32 object-cover rounded-t-xl" />
        <div class="grid grid-cols-3 gap-4 px-2 py-1 items-center rounded-lg">
            <div class="col-span-2">
                <h1 class="font-bold text-stone-800 text-lg leading-none">{{props.tour.getName()}}</h1>
                <p class="text-stone-500 text-sm">{{props.tour.getDescription()}}</p>
                <p class="text-stone-500 text-sm">{{props.tour.getRanking().getGeneral().length}} participants</p>
                <p class="text-stone-500 text-sm">{{props.tour.getSegments().length}} segments</p>
            </div>
            <div class="col-span-1">
                <button class="bg-neutral-800 text-white px-2 py-1 rounded-lg" @click="goToParticipation(tour)">Participer</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { TourResultat } from '@/model/TourResultat';
import tourBanner from '@/assets/images/background/carte.jpg';
import { useResultatTourStore } from '@/stores/ResultatTourStore';
import { useRoutingService } from '@/services/routingService';

const toursResultatStore = useResultatTourStore();
const routingService = useRoutingService();

const props = defineProps({
    tour: {
        type: TourResultat  ,
        required: true
    }
});

const goToParticipation = (tour: TourResultat) => {
    toursResultatStore.setTourResultat(tour);
    routingService.goToActivities();
}

</script>
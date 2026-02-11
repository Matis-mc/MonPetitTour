<template>
    <div class="flex flex-col h-screen">
        <h2>{{tourStore.tourCreation.name }}</h2>
        <p> {{ tourStore.tourCreation.description }}</p>
        <MapComponent :isEditing="false" class="w-full h-80"/>
        <div v-for="(segment, index) in segments" :key="index">
            <SegmentRankinkByCategorie v-if="segment.length > 0" :categorie="categories[index]" :segments="segment" />
        </div>
        <button 
            @click="confirmationSegments()" 
            class="fixed w-16 h-16 bottom-4 right-4 px-4 py-2 text-white rounded-full shadow-lg bg-emerald-200">
            <img src="@/assets/images/icones/valider.png" alt="Continue Icon" class="inline-block w-16 h-auto"/>
        </button>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import SegmentRankinkByCategorie from '@/components/segments/SegmentRankinkByCategorie.vue';
import { CATEGORIES, CATEGORY_NAMES } from '@/constants/categories';
import MapComponent from '../MapComponent.vue';
import { useRoutingService } from '@/services/routingService';
import { useTourStore } from '@/stores/tourStore';
import ApiService from '@/services/ApiService';

const routingService = useRoutingService();
const tourStore = useTourStore();
const categories = CATEGORY_NAMES;

const segments = computed(() => 
  [segmentMontee.value, segmentPlat.value, segmentDescente.value]
);
const segmentMontee = computed(() => 
  tourStore.tourCreation.getSegments().filter(s => s.categorie === CATEGORIES.MOUNTAIN.code)
);
const segmentPlat = computed(() => 
  tourStore.tourCreation.getSegments().filter(s => s.categorie === CATEGORIES.FLAT.code)
);
const segmentDescente = computed(() => 
  tourStore.tourCreation.getSegments().filter(s => s.categorie === CATEGORIES.DESCENT.code)
);

const confirmationSegments = () => {
    ApiService.createTour(tourStore.tourCreation).then(() => {
        tourStore.resetTourCreation();
    });
    routingService.goToHome();
};

</script>
<template>
  <div class="max-w-7xl mx-auto spy-8">
        <div v-for="(segment, index) in segments" :key="index">
            <SegmentRankinkByCategorie v-if="segment.length > 0" :categorie="categories[index]" :segments="segment" />
        </div>
        <button 
            @click="confirmationSegments()" 
            class="fixed w-16 h-16 bottom-16 right-4 px-4 py-2 text-white rounded-full shadow-lg bg-emerald-300">
            <img src="@/assets/images/icones/fleche-droite.png" alt="Continue Icon" class="inline-block w-16 h-auto"/>
        </button>
    </div>
</template>
<script setup lang="ts">
import { useMapStore } from '@/stores/MapStore';
import { computed } from 'vue';
import SegmentRankinkByCategorie from '@/components/segments/SegmentRankinkByCategorie.vue';
import { CATEGORIES, CATEGORY_NAMES } from '@/constants/categories';
import { useRoutingService } from '@/services/routingService';
import { useCreationTourStore } from '@/stores/CreationTourStore';

const routingService = useRoutingService();

const tourStore = useCreationTourStore();
const mapStore = useMapStore();
const categories = CATEGORY_NAMES;

const confirmationSegments = () => {
    const segments = mapStore.getSegments;
    tourStore.tourCreation.setSegments(segments);
    routingService.gotoConfirmation();
};

const segments = computed(() => 
  [segmentMontee.value, segmentPlat.value, segmentDescente.value]
);

const segmentMontee = computed(() => 
  mapStore.getSegments.filter(s => s.category === CATEGORIES.MOUNTAIN.code)
);

const segmentPlat = computed(() => 
  mapStore.getSegments.filter(s => s.category === CATEGORIES.FLAT.code)
);

const segmentDescente = computed(() => 
  mapStore.getSegments.filter(s => s.category === CATEGORIES.DESCENT.code)
);

</script>    
<template>
    <div>
        <div v-for="(segment, index) in segments" :key="index">
            <SegmentRankinkByCategorie v-if="segment.length > 0" :categorie="categories[index]" :segments="segment" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { useMapStore } from '@/stores/MapStore';
import { computed } from 'vue';
import SegmentRankinkByCategorie from './SegmentRankinkByCategorie.vue';
import { CATEGORIES, CATEGORY_NAMES } from '@/constants/categories';

const mapStore = useMapStore();
const categories = CATEGORY_NAMES;

const segments = computed(() => 
  [segmentMontee.value, segmentPlat.value, segmentDescente.value]
);

const segmentMontee = computed(() => 
  mapStore.getSegments.filter(s => s.categorie === CATEGORIES.MOUNTAIN.code)
);

const segmentPlat = computed(() => 
  mapStore.getSegments.filter(s => s.categorie === CATEGORIES.FLAT.code)
);

const segmentDescente = computed(() => 
  mapStore.getSegments.filter(s => s.categorie === CATEGORIES.DESCENT.code)
);

</script>    
<template>
    <div>
        <div v-for="(segment, index) in segments" :key="index">
            <SegmentRankinkByCategorie :categorie="categories[index]" :segments="segment" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { useMapStore } from '@/stores/MapStore';
import { computed } from 'vue';
import SegmentRankinkByCategorie from './SegmentRankinkByCategorie.vue';

const mapStore = useMapStore();
const categories = ['Montée', 'Plat', 'Descente'];

const segments = computed(() => 
  [segmentMontee.value, segmentPlat.value, segmentDescente.value]
);

const segmentMontee = computed(() => 
  mapStore.getSegments.filter(s => s.categorie === 'Montée')
);

const segmentPlat = computed(() => 
  mapStore.getSegments.filter(s => s.categorie === 'Plat')
);

const segmentDescente = computed(() => 
  mapStore.getSegments.filter(s => s.categorie === 'Descente')
);

</script>    
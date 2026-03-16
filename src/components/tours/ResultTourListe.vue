<template>
    <div class="flex flex-col gap-2">
        <ResultTourListElement v-for="tour in tours" :key="tour.code" :tour="tour" />
    </div>
    <div v-if="tours.length === 0">
        <p>Aucun tour trouvé</p>
    </div>
</template>

<script setup lang="ts">
import ResultTourListElement from './ResultTourListElement.vue';
import { TourResultat } from '@/model/TourResultat';

const props = defineProps({
    tours: {
        type: Array as () => TourResultat[],
        required: true
    }
});
</script>
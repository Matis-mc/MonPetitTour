<template>
    <div id="map" class="grid grid-cols-3 gap-4 rounded-lg shadow-md">
        <h3 class="text-lg font-medium mb-2">{{ props.numero }}</h3>
        <div>
            <p class="text-sm">Distance : {{ props.segment.distance.toFixed(2) }} m</p>
            <p class="text-sm">Pente Moyenne : {{ props.segment.slope.toFixed(2) }} %</p>
        </div>
        <img :src="getIconeFromCategory(props.segment.categorie)" alt="Segment Image" class="w-32 h-auto rounded-md"/>
    </div>
</template>
<script setup lang="ts">
import { Segment } from '@/model/Segment';


const props = defineProps({
  segment: {
    type: Object as () => Segment,
    required: true
  },
  numero: {
    type: Number,
    required: true
  }
});

const getIconeFromCategory = (category: string): string => {
    switch (category) {
        case 'D':
            return '@/assets/images/icones/descente.png';
        case 'M':
            return '@/assets/images/icones/montagne.png';
        case 'S':
            return '@/assets/images/icones/sprint.png';
        default:
            return '@/assets/images/icones/general.png';
    }
};

</script>
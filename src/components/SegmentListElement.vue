<template>
    <div id="map" class="grid grid-cols-3 gap-4 shadow-md bg-white items-center justify-items-center">
        <h3 class="text-lg font-medium mb-2">{{ props.index }}</h3>
        <div class="text-center">
            <p class="text-sm">Distance : {{ props.segment.distance.toFixed(2) }} m</p>
            <p class="text-sm">Dénivelé : {{ props.segment.slope.toFixed(2) }} %</p>
        </div>
        <div class="relative">
            <img 
                @click="isPopupOpen = true"
                :src="getIconeFromCategory(props.segment.categorie)" 
                alt="Segment Image" 
                class="w-16 h-16 rounded-md cursor-pointer hover:opacity-80"/>
            
            <div v-if="isPopupOpen" class="absolute top-20 left-0 bg-white border rounded-lg shadow-lg p-3 z-10">
                <p class="text-xs font-semibold mb-2">Catégorie:</p>
                <button 
                    @click="selectCategory('D')"
                    class="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm">
                    <img :src="descenteIcon" class="w-8 h-8 inline mr-2"/>Descente
                </button>
                <button 
                    @click="selectCategory('M')"
                    class="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm">
                    <img :src="montagneIcon" class="w-8 h-8 inline mr-2"/>Montagne
                </button>
                <button 
                    @click="selectCategory('S')"
                    class="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm">
                    <img :src="sprintIcon" class="w-8 h-8 inline mr-2"/>Sprint
                </button>
                <button 
                    @click="selectCategory('G')"
                    class="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm">
                    <img :src="generalIcon" class="w-8 h-8 inline mr-2"/>Général
                </button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { Segment } from '@/model/Segment';
import { useMapStore } from '@/stores/MapStore';
import { ref } from 'vue';
import descenteIcon from '@/assets/images/icones/descente.png';
import montagneIcon from '@/assets/images/icones/montagne.png';
import sprintIcon from '@/assets/images/icones/sprint.png';
import generalIcon from '@/assets/images/icones/general.png';

const mapStore = useMapStore();
const isPopupOpen = ref(false);

const props = defineProps({
  segment: {
    type: Object as () => Segment,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
});

const getIconeFromCategory = (category: string): string => {
    switch (category) {
        case 'D':
            return descenteIcon;
        case 'M':
            return montagneIcon;
        case 'S':
            return sprintIcon;
        default:
            return generalIcon;
    }
};

const selectCategory = (category: string) => {
    mapStore.updateSegmentCategory(props.index, category);
    isPopupOpen.value = false;
};

</script>
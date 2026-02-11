<template>
    <div class="max-w-7xl mx-auto spy-8">
    <div class="h-screen flex flex-col">
        <h2>{{ tourStore.tourCreation.name }}</h2>
        <MapComponent :is-editing="true" class="flex-1"/>
        <button class="fixed w-16 h-16 bottom-4 left-4 px-4 py-2 text-white rounded-full shadow-lg bg-teal-50" @click="openSegmentModal()">
            <img src="@/assets/images/icones/segment.png" alt="Download Icon" class="inline-block w-16 h-auto"/>
        </button>
        <button v-if="hasSegmentCreated" class="fixed w-16 h-16 bottom-4 right-4 px-4 py-2 text-white rounded-full shadow-lg bg-emerald-300" @click="routingService.goToRanking()">
            <img src="@/assets/images/icones/fleche-droite.png" alt="Continue Icon" class="inline-block w-16 h-auto"/>
        </button>
    </div>
    <Teleport to="body">
        <div v-if="isSegmentModalVisible" class="fixed top-4 rounded-xl inset-0 bg-amber-100 flex-col items-center justify-center">
            <button @click="closeSegmentModal()">
                <img src="@/assets/images/icones/chevron-bas.png" alt="Close Icon" class="inline-block w-6 h-auto"/>
            </button>
            <SegmentVisualisationComponent/>
        </div>
</Teleport>
</div>  
</template>

<script setup lang="ts">
import MapComponent from '@/components/MapComponent.vue';
import SegmentVisualisationComponent from '@/components/segments/SegmentVisualisationComponent.vue';
import { useRoutingService } from '@/services/routingService';
import { useMapStore } from '@/stores/MapStore';
import { useTourStore } from '@/stores/tourStore';
import { computed, ref } from 'vue';

const routingService = useRoutingService();

const mapStore = useMapStore();
const tourStore = useTourStore();

const isSegmentModalVisible = ref(false);
const hasSegmentCreated = computed(() => mapStore.getSegments.length > 0);

const openSegmentModal = () => {
    isSegmentModalVisible.value = true;
}

const closeSegmentModal = () => {
    isSegmentModalVisible.value = false;
}

</script>
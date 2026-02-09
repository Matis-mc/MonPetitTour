<template>
      <div class="max-w-7xl mx-auto spy-8">
    <div class="h-screen flex flex-col">
        <MapComponent :is-editing="true" class="flex-1"/>
        <button class="fixed w-16 h-16 bottom-4 left-4 px-4 py-2 text-white rounded-full shadow-lg bg-teal-50" @click="workflowStore.openSegmentModal()">
            <img src="@/assets/images/icones/segment.png" alt="Download Icon" class="inline-block w-16 h-auto"/>
        </button>
        <button v-if="hasSegmentCreated" class="fixed w-16 h-16 bottom-4 right-4 px-4 py-2 text-white rounded-full shadow-lg bg-emerald-300" @click="goToRanking()">
            <img src="@/assets/images/icones/fleche-droite.png" alt="Continue Icon" class="inline-block w-16 h-auto"/>
        </button>
    </div>
    <Teleport to="body">
        <div v-if="workflowStore.isSegmentModalVisible" class="fixed top-4 rounded-xl inset-0 bg-amber-100 flex-col items-center justify-center">
            <button @click="workflowStore.closeSegmentModal()">
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
import { useMapStore } from '@/stores/MapStore';
import { useWorkFlowStore } from '@/stores/WorkFlowStore';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const workflowStore = useWorkFlowStore();
const mapStore = useMapStore();
const router = useRouter();

const hasSegmentCreated = computed(() => mapStore.getSegments.length > 0);

const goToRanking = () => {
    router.push('/tour/ranking');
}

</script>
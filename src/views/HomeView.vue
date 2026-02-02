<template>
  <div class="max-w-7xl mx-auto spy-8">
    <div class="bg-amber-200 rounded-lg shadow p-2 m-2">
      <div v-if="step == 0">
        <FileInputComponent :fileType="'.gpx'" :onFileLoaded="loadGPXFile" />
      </div>
      <div v-if="step<2">
        <MapView />
      </div>
      <div v-if="step==2">
        <SegmentsRankingView/>
      </div>
      <div v-if="step==3">
        <CreationToursConfirmation/> 
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FileInputComponent from '@/components/FileInputComponent.vue';
import SegmentsRankingView from '@/views/SegmentsRankingView.vue';
import CreationToursConfirmation from '@/components/tours/CreationToursConfirmation.vue';
import { useMapStore } from '@/stores/MapStore';
import { useWorkFlowStore } from '@/stores/WorkFlowStore';
import { computed } from 'vue';
import MapView from './MapView.vue';

const mapStore = useMapStore()
const workflowStore = useWorkFlowStore();

const step = computed(() => workflowStore.currentStep);


const loadGPXFile = (event: any) => {
    const file = event.target.files?.[0];
      if (file) {
        mapStore.setGpxFile(file);
        workflowStore.nextStep();
      }
};

</script>

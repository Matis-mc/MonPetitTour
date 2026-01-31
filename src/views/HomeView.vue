<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="bg-white rounded-lg shadow p-6">
      <div v-if="step == 0">
        <FileInputComponent :fileType="'.gpx'" :onFileLoaded="(event) => {
          const file = event.target.files?.[0];
          if (file) {
            loadGPXFile(file);
          }
        }" />
      </div>
      <div>
        <MapComponent />
      </div>
      <div v-if="step==2">
        <SegmentsRankingComponent/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FileInputComponent from '@/components/FileInputComponent.vue';
import MapComponent from '@/components/MapComponent.vue'
import SegmentsRankingComponent from '@/components/SegmentsRankingComponent.vue';
import { useMapStore } from '@/stores/MapStore';
import { useWorkFlowStore } from '@/stores/WorkFlowStore';
import { computed } from 'vue';

const mapStore = useMapStore()
const workflowStore = useWorkFlowStore();

const step = computed(() => workflowStore.currentStep);


const loadGPXFile = (file: File) => {
  mapStore.setGpxFile(file);
  workflowStore.nextStep();
};

</script>

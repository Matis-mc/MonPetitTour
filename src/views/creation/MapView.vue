<template>
    <div class="h-screen flex flex-col lg:flex-row overflow-hidden bg-neutral-50">
        <!-- Main Map Area -->
        <div class="flex-1 relative h-full">
            <MapComponent :is-editing="true" class="h-full w-full"/>
            
            <!-- Floating Mobile Button for Segments -->
            <button 
                class="lg:hidden fixed w-14 h-14 bottom-20 left-4 px-3 py-2 text-white rounded-xl shadow-xl bg-white/90 backdrop-blur-sm border border-stone-200 z-40 transition-transform active:scale-95" 
                @click="openSegmentModal()">
                <img src="@/assets/images/icones/segment.png" alt="Segments" class="w-full h-full object-contain"/>
            </button>

            <!-- Floating Navigation Button -->
            <button 
                v-if="hasSegmentCreated" 
                class="fixed w-14 h-14 bottom-20 right-4 px-3 py-2 text-white rounded-xl shadow-xl bg-emerald-400 hover:bg-emerald-500 z-40 transition-all active:scale-95" 
                @click="routingService.goToCreationSegmentRanking()">
                <img src="@/assets/images/icones/fleche-droite.png" alt="Continuer" class="w-full h-full object-contain filter invert brightness-0"/>
            </button>
        </div>

        <!-- Sidebar for Large Screens -->
        <div class="hidden lg:flex flex-col w-96 bg-white border-l border-stone-200 shadow-2xl h-full z-10">
            <div class="p-6 border-b border-stone-100 flex justify-between items-center bg-stone-50/50">
                <h2 class="text-xl font-bold text-stone-800 flex items-center">
                    <img src="@/assets/images/icones/segment.png" class="w-6 h-6 mr-2" />
                    Segments
                </h2>
                <span class="text-xs font-semibold px-2 py-1 bg-stone-200 text-stone-600 rounded-full">
                    {{ mapStore.getSegments.length }} créés
                </span>
            </div>
            <div class="flex-1 overflow-y-auto bg-white custom-scrollbar p-2">
                <SegmentVisualisationComponent/>
                <div v-if="!hasSegmentCreated" class="flex flex-col items-center justify-center h-40 text-stone-400">
                    <p class="text-sm">Cliquez sur la carte pour</p>
                    <p class="text-sm">commencer un segment</p>
                </div>
            </div>
        </div>

        <!-- Mobile Modal -->
        <Teleport to="body">
            <div v-if="isSegmentModalVisible" class="lg:hidden fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
                <div class="bg-white w-full max-h-[85vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden relative border border-stone-200">
                    <div class="p-4 border-b border-stone-100 flex justify-between items-center bg-stone-50/50">
                        <h2 class="font-bold text-stone-800">Liste des segments</h2>
                        <button @click="closeSegmentModal()" class="p-1 hover:bg-stone-200 rounded-full transition-colors">
                            <img src="@/assets/images/icones/chevron-bas.png" alt="Close" class="w-6 h-6"/>
                        </button>
                    </div>
                    <div class="flex-1 overflow-y-auto p-2">
                        <SegmentVisualisationComponent/>
                    </div>
                </div>
            </div>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
import MapComponent from '@/components/map/MapComponent.vue';
import SegmentVisualisationComponent from '@/components/segments/SegmentVisualisationComponent.vue';
import { useRoutingService } from '@/services/RoutingService';
import { useMapStore } from '@/stores/MapStore';
import { computed, ref } from 'vue';
import HeightChart from '@/components/map/HeightChart.vue';

const routingService = useRoutingService();

const mapStore = useMapStore();

const isSegmentModalVisible = ref(false);
const hasSegmentCreated = computed(() => mapStore.getSegments.length > 0);

const openSegmentModal = () => {
    isSegmentModalVisible.value = true;
}

const closeSegmentModal = () => {
    isSegmentModalVisible.value = false;
}

</script>
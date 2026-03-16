<template>
    <div class="flex flex-col h-full">
        <!-- Titre -->
        <div class="px-4 pt-3 pb-1">
            <h2 class="text-lg font-semibold">{{ tourStore.tourCreation.name }}</h2>
            <p class="text-sm text-gray-500">{{ tourStore.tourCreation.description }}</p>
        </div>

        <!-- Carte -->
        <MapComponent :isEditing="false" class="w-full aspect-square flex-shrink-0"/>

        <!-- Indicateurs de panneau -->
        <div class="flex justify-center gap-2 py-2">
            <button
                v-for="(_, i) in 2" :key="i"
                @click="activePanel = i"
                :class="['w-2 h-2 rounded-full transition-all duration-300', activePanel === i ? 'bg-stone-700 w-5' : 'bg-stone-300']"
            />
        </div>

        <!-- Slider -->
        <div class="flex-1 overflow-hidden relative">
            <div
                class="flex h-full transition-transform duration-300 ease-in-out"
                :style="{ transform: `translateX(-${activePanel * 100}%)` }"
            >
                <!-- Panneau 1 : Code + QR Code -->
                <div class="min-w-full h-full overflow-y-auto flex flex-col items-center justify-center gap-6 px-6">
                    <div class="text-center">
                        <p class="text-xs uppercase tracking-widest text-gray-400 mb-1">Code du tour</p>
                        <p class="text-3xl font-mono font-bold tracking-wider text-stone-800">
                            {{ tourStore.tourCreation.code}}
                        </p>
                    </div>
                    <!-- Placeholder QR Code -->
                    <div class="w-40 h-40 bg-stone-200 rounded-xl flex items-center justify-center border-2 border-dashed border-stone-400">
                    </div>
                </div>

                <!-- Panneau 2 : Segments -->
                <div class="min-w-full h-full overflow-y-auto px-2 pb-20">
                    <div v-for="(segment, index) in segments" :key="index">
                        <SegmentRankinkByCategorie
                            v-if="segment.length > 0"
                            :categorie="categories[index]"
                            :segments="segment"
                        />
                    </div>
                    <p v-if="segments.every(s => s.length === 0)" class="text-center text-gray-400 mt-8">
                        Aucun segment enregistré.
                    </p>
                </div>
            </div>
        </div>

        <!-- Bouton validation -->
        <button
            @click="confirmationCreationTour()"
            class="fixed w-16 h-16 bottom-16 right-4 px-4 py-2 text-white rounded-full shadow-lg bg-emerald-200">
            <img src="@/assets/images/icones/valider.png" alt="Continue Icon" class="inline-block w-16 h-auto"/>
        </button>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import SegmentRankinkByCategorie from '@/components/segments/SegmentRankinkByCategorie.vue';
import { CATEGORIES, CATEGORY_NAMES } from '@/constants/categories';
import MapComponent from '../MapComponent.vue';
import { useRoutingService } from '@/services/routingService';
import { useCreationTourStore } from '@/stores/CreationTourStore';
import ApiService from '@/services/ApiService';


const routingService = useRoutingService();
const tourStore = useCreationTourStore();
const categories = CATEGORY_NAMES;

const activePanel = ref(0);

const segments = computed(() =>
  [segmentMontee.value, segmentPlat.value, segmentDescente.value]
);
const segmentMontee = computed(() =>
  tourStore.tourCreation.getSegments().filter(s => s.categorie === CATEGORIES.MOUNTAIN.code)
);
const segmentPlat = computed(() =>
  tourStore.tourCreation.getSegments().filter(s => s.categorie === CATEGORIES.FLAT.code)
);
const segmentDescente = computed(() =>
  tourStore.tourCreation.getSegments().filter(s => s.categorie === CATEGORIES.DESCENT.code)
);

const confirmationCreationTour = () => {
    ApiService.createTour(tourStore.tourCreation).then(() => {
        tourStore.resetTourCreation();
    });
    routingService.goToHome();
};
</script>
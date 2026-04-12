<template>
    <div class="flex flex-col items-center gap-2 p-2" :style="{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover' }">
        <h2 class="text-3xl font-bold text-gray-800 text-center">Classement par Segments</h2>
        
        <div v-if="tourResultat && tourResultat.segments.length > 0" class="flex flex-col gap-2 w-full max-w-4xl">
            <RankingBySegment 
                v-for="(segment, index) in tourResultat.segments" 
                :key="index" 
                :segment="segment" 
            />
        </div>
        
        <div v-else class="text-xl text-gray-600">
            Aucun segment disponible.
        </div>

        <BlackRoundButton text="Retour" @click="routingService.goToCategorieRanking()" class="mt-4" />
    </div>
</template>

<script setup lang="ts">
import { useResultatTourStore } from '@/stores/ResultatTourStore';
import RankingBySegment from '@/components/resultats/RankingBySegment.vue';
import BlackRoundButton from '@/components/generics/BlackRoundButton.vue';
import { useRoutingService } from '@/services/RoutingService';
import bgImage from '@/assets/images/background/background-light.png';
import { storeToRefs } from 'pinia';

const store = useResultatTourStore();
const { tourResultat } = storeToRefs(store);
const routingService = useRoutingService();

</script>

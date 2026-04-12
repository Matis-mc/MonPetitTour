<template>
    <div class="flex flex-col items-center gap-6 p-6" :style="{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover' }">
        <h2 class="text-3xl font-bold text-gray-800">Classements du Tour</h2>
        
        <div v-if="tourResultat" class="flex flex-col gap-8 w-full max-w-4xl">
            <RankingByCategory 
                categoryName="Classement Général" 
                :rankings="tourResultat.ranking.general" 
            />
            <RankingByCategory 
                v-if="tourResultat.ranking.mountain.length > 0"
                categoryName="Meilleur Grimpeur" 
                :rankings="tourResultat.ranking.mountain" 
            />
            <RankingByCategory 
                v-if="tourResultat.ranking.sprint.length > 0"
                categoryName="Classement par Points" 
                :rankings="tourResultat.ranking.sprint" 
            />
            <RankingByCategory 
                v-if="tourResultat.ranking.descent.length > 0"
                categoryName="Meilleur Descendeur" 
                :rankings="tourResultat.ranking.descent" 
            />
        </div>
        
        <div v-else class="text-xl text-gray-600">
            Aucun résultat disponible.
        </div>

        <div class="flex gap-4 mt-4">
            <BlackRoundButton text="Retour" @click="routingService.goToResult()" />
            <BlackRoundButton text="Suivant" @click="routingService.goToSegmentRanking()" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useResultatTourStore } from '@/stores/ResultatTourStore';
import RankingByCategory from '@/components/resultats/RankingByCategory.vue';
import BlackRoundButton from '@/components/generics/BlackRoundButton.vue';
import { useRoutingService } from '@/services/RoutingService';
import bgImage from '@/assets/images/background/background-light.png';
import { storeToRefs } from 'pinia';

const store = useResultatTourStore();
const { tourResultat } = storeToRefs(store);
const routingService = useRoutingService();

</script>

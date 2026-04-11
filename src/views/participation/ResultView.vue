<template>
    <div class="flex flex-col items-center gap-6">
        <img  class="w-64 h-64 rounded-full" :src="img_user" alt="">
        <img class="w-32 h-32" :src="decoration_general" alt="">
        <BlackRoundButton text="Suivant" @click="routingService.goToCategorieRanking()" />
    </div>
</template>
<script setup lang="ts">
import RankingService from '@/services/RankingService';
import { useAuthStore } from '@/stores/AuthStore';
import { useResultatTourStore } from '@/stores/ResultatTourStore';
import { onMounted, ref } from 'vue';
import or from '@/assets/images/icones/medaille_or.png';
import argent from '@/assets/images/icones/medaille_argent.png';
import bronze from '@/assets/images/icones/medaille_bronze.png';
import drapeau from '@/assets/images/icones/drapeau.png';
import BlackRoundButton from '@/components/generics/BlackRoundButton.vue';
import { useRoutingService } from '@/services/routingService';

const authStore = useAuthStore();
const routingService = useRoutingService();
const resultatTourStore = useResultatTourStore();
const user = ref();
const tourResultat = ref();
const userResultat = ref();
const img_user = ref();
const user_general_rank = ref();
const decoration_general = ref();

onMounted(() => {
    user.value = authStore.getUser();
    img_user.value = user.value?.profile;
    tourResultat.value = resultatTourStore.tourResultat;
    userResultat.value = RankingService.getUserResult(tourResultat.value, user.value);
    user_general_rank.value = getUserGeneralRank();
    decoration_general.value = getDecorationFromGeneralResult();
});

const getUserGeneralRank = () => {
    return userResultat.value[0].rank.rank;
}

const getDecorationFromGeneralResult = () => {
    switch(user_general_rank.value){
        case 1:
            return or
        case 2:
            return argent
        case 3:
            return bronze
        default:
            return  drapeau
    }
}
    



</script>
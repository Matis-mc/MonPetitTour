<template>
    <div class="md:rounded-xl grid grid-cols-7 w-full md:max-w-md p-3 pt-10 bg-white/5 backdrop-blur-md shadow-lg footer-mask h-25">
        <div class="col-span-3 flex justify-around items-center bg-white rounded-full h-12 w-32 pr-2 justify-self-start" @click="routingService.goToCreateTour()">
            <img src="@/assets/images/icones/creation-tour.png" alt="Logo" class="w-10 h-10 bg-gray-200 rounded-full p-1">
            <p class="text-sm">Création</p>
        </div>

        <div class="col-span-1 flex justify-center items-center" @click="routingService.goToHome()">
            <img src="@/assets/images/icones/accueil.png" alt="Logo" class="w-10 h-10 bg-gray-200 rounded-full p-2 border border-white border-2">
        </div>

        <div class="col-span-3 flex justify-around items-center bg-white rounded-full h-12 w-32 pl-2 justify-self-end" @click="routingService.goToRejoindreTour()">
            <p class="text-sm">Recherche</p>
            <img src="@/assets/images/icones/participation-tour.png" alt="Logo" class="w-10 h-10 bg-gray-200 rounded-full p-1">
        </div>

    </div>
</template>
<script setup lang="ts">
import { useRoutingService } from '@/services/RoutingService';

const routingService = useRoutingService();

</script>

<style scoped>
.footer-mask {
    mask-image: linear-gradient(to bottom, transparent 0%, black 50%);
    -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 50%);
}

</style>
<template>
    <div class="md:rounded-xl grid grid-cols-5 w-full md:max-w-md p-3 bg-white/40 backdrop-blur-md shadow-lg border border-white/20">
        <div class="col-span-1 flex justify-center items-center" @click="routingService.goToCreateTour()">
            <img src="@/assets/images/icones/creation-tour.png" 
             alt="Logo" class="w-10 h-10">
        </div>
        <div class="col-span-1 flex justify-center items-center" @click="routingService.goToRejoindreTour()">
            <img src="@/assets/images/icones/participation-tour.png" alt="Logo" class="w-10 h-10">
        </div>
        <div class="col-span-1 flex justify-center items-center" @click="routingService.goToHome()">
            <img src="@/assets/images/icones/accueil.png" alt="Logo" class="w-10 h-10">
        </div>
        <div class="col-span-1 flex justify-center items-center">
            <img src="@/assets/images/icones/trophee.png" alt="Logo" class="w-10 h-10">
        </div>
        <div class="col-span-1 flex justify-center items-center">
            <img src="@/assets/images/icones/statistiques.png" alt="Logo" class="w-10 h-10">
        </div>
    </div>
</template>
<script setup lang="ts">
import { useRoutingService } from '@/services/RoutingService';

const routingService = useRoutingService();

</script>
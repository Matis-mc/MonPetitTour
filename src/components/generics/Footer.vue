<template>
    <div class="flex grid grid-cols-5 w-full p-3">
        <div class="col-span-1" @click="routingService.goToCreateTour()">
            <img src="@/assets/images/icones/creation-tour.png" 
             alt="Logo" class="w-10 h-10">
        </div>
        <div class="col-span-1">
            <img src="@/assets/images/icones/participation-tour.png" alt="Logo" class="w-10 h-10">
        </div>
        <div class="col-span-1">
            <img src="@/assets/images/icones/accueil.png" alt="Logo" class="w-10 h-10">
        </div>
        <div class="col-span-1">
            <img src="@/assets/images/icones/trophee.png" alt="Logo" class="w-10 h-10">
        </div>
        <div class="col-span-1">
            <img src="@/assets/images/icones/statistiques.png" alt="Logo" class="w-10 h-10">
        </div>
    </div>
</template>
<script setup lang="ts">
import { useRoutingService } from '@/services/routingService';

const routingService = useRoutingService();

</script>
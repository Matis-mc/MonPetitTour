<template>
    <div class="flex bg-stone-100 flex-col gap-10 mx-auto p-10 justify-items-center"
    :style="{ backgroundImage: `url(${bgImage})` }">
      <button class="w-64 rounded shadow p-3 bg-red-400 self-center" @click="routingService.goToCreateTour()">Créer un tour</button>
      <button class="w-64 rounded shadow p-3 bg-cyan-400 self-center">Rejoindre un tour</button>
    </div>
</template>

<script setup lang="ts">
import { useRoutingService } from '@/services/routingService';
import bgImage from '@/assets/images/background/background-light.png';

const routingService = useRoutingService();
</script>

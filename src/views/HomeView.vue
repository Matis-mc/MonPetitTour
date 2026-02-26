<template>
    <div class="flex bg-amber-200 flex-col gap-10 mx-auto p-10 justify-items-center">
      <button class="w-64 rounded shadow p-3 bg-red-400 self-center" @click="routingService.goToCreateTour()">Créer un tour</button>
      <button class="w-64 rounded shadow p-3 bg-cyan-400 self-center">Rejoindre un tour</button>
    </div>
</template>

<script setup lang="ts">
import { useRoutingService } from '@/services/routingService';

const routingService = useRoutingService();
</script>

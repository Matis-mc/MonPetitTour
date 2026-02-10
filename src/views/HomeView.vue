<template>
      <div class="bg-amber-200 rounded-lg shadow p-2 m-2">

  <div class="flex flex-col max-w-7xl mx-auto spy-8">
      <button @click="routingService.goToCreateTour()">Créer un tour</button>
      <button>Rejoindre un tour</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoutingService } from '@/services/routingService';

const routingService = useRoutingService();
</script>

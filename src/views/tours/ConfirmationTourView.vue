<template>
  <div class="max-w-7xl mx-auto spy-8">
    <div class="bg-stone-100 rounded-lg shadow p-2 ">
      <CreationToursConfirmation @confirmationCreationTour="confirmationCreationTour"/> 
    </div>
  </div>
</template>

<script setup lang="ts">
import CreationToursConfirmation from '@/components/tours/CreationToursConfirmation.vue';
import ApiService from '@/services/ApiService';
import { useCreationTourStore } from '@/stores/CreationTourStore';
import { useRoutingService } from '@/services/routingService';
const tourStore = useCreationTourStore();
const routingService = useRoutingService();

const confirmationCreationTour = () => {
    ApiService.createTour(tourStore.tourCreation).then(() => {
        tourStore.resetTourCreation();
    });
    routingService.goToHome();
};</script>

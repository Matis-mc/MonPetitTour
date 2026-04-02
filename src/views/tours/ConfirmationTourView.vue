<template>
  <div class="max-w-7xl mx-auto spy-8">
    <div class="bg-stone-100 rounded-lg shadow p-2 ">
      <CreationToursConfirmation @confirmationCreationTour="confirmationCreationTour"/> 
    </div>
    <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong class="font-bold">Erreur !</strong>
      <span class="block sm:inline"> {{ error }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import CreationToursConfirmation from '@/components/tours/CreationToursConfirmation.vue';
import ApiService from '@/services/ApiService';
import { useCreationTourStore } from '@/stores/CreationTourStore';
import { useRoutingService } from '@/services/routingService';
import { ref } from 'vue';

const tourStore = useCreationTourStore();
const routingService = useRoutingService();
const error = ref<string | null>(null);

const confirmationCreationTour = async () => {
    try {
        await ApiService.createTour(tourStore.tourCreation);
        tourStore.resetTourCreation();
        error.value = null;
        routingService.goToHome();
    } catch (err: any) {
        console.error('Error creating tour:', err);
        tourStore.resetTourCreation();
        error.value = err.response?.data?.message || err.message || "Une erreur est survenue lors de la création du tour.";
    }
};</script>

<template>
    <div class="flex flex-col items-center">
        <h2 class="text-2xl my-2 font-bold"> Sélectionne une activité</h2>
        <FileInputComponent :fileType="'.fit'" :onFileLoadedEvent="loadFitFile" />
            <div v-if="messageError" class="text-red-500 text-center p-4 rounded-lg bg-red-100 absolute bottom-20">
        {{ messageError }}
    </div>
    </div>
</template>
<script setup lang="ts">
import ApiService from '@/services/ApiService';
import FileInputComponent from '@/components/generics/FileInputComponent.vue';
import { useRoutingService } from '@/services/RoutingService';
import { useResultatTourStore } from '@/stores/ResultatTourStore';
import { mapToTourResultat } from '@/mapper/TourResultatMapper';
import { ref } from 'vue';

const loading = ref(false);
const messageError = ref("");

const routingService = useRoutingService();
const userResultat = useResultatTourStore();

const loadFitFile = (event: any) => {
    loading.value = true;
    ApiService.loadResultTourFromFitFile(event.target.files[0], userResultat.tourResultat.getId()).then(
        (resultat: any) => {
            console.log(resultat);
            userResultat.setTourResultat(mapToTourResultat(resultat));
            routingService.goToResult();
        }
    ).catch((error: any) => {
        messageError.value = "Impossible de charger votre activité";
        console.log(error);
    }).finally(() => {
        loading.value = false;
    });
};

</script>

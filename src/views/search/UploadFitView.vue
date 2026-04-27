<template>
    <div class="flex w-2/3 min-w-80 flex-col items-center justify-center bg-cover bg-center bg-no-repeat" :style="{ backgroundImage: `url(${bgImage})` }">
        <div class="bg-white p-4 rounded-lg m-4 shadow-lg">
            <h2 class="text-2xl my-2 text-center font-bold"> Ajouter le fichier '.fit' de votre activité</h2>
            <FileInputComponent :fileType="'.fit'" :onFileLoadedEvent="loadFitFile"/>
            <div v-if="messageError" class="text-red-500 text-center p-4 rounded-lg bg-red-100 absolute bottom-20">
                {{ messageError }}
            </div>
        </div>
        <div v-if="loading">
            <LoaderComponent message="Chargement de votre participation"/>
        </div>
    </div>
</template>
<script setup lang="ts">
import ApiService from '@/services/ApiService';
import FileInputComponent from '@/components/generics/FileInputComponent.vue';
import LoaderComponent from '@/components/generics/LoaderComponent.vue';
import { useRoutingService } from '@/services/RoutingService';
import { useResultatTourStore } from '@/stores/ResultatTourStore';
import { mapToTourResultat } from '@/mapper/TourResultatMapper';
import bgImage from '@/assets/images/background/background-light.png';
import { ref } from 'vue';

const loading = ref(false);
const messageError = ref("");

const routingService = useRoutingService();
const userResultat = useResultatTourStore();

const loadFitFile = (event: any) => {
    loading.value = true;
    console.log("userResultat", userResultat.tourResultat);
    ApiService.loadResultTourFromFitFile(event.target.files[0], userResultat.getTourResultat()!.getId()).then(
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

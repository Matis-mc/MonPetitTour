<template>
    <div class="flex flex-col items-center gap-2 p-4 mx-4 shadow-md rounded-xl bg-gray-100">
        <div class="flex flex-col items-center gap-2">
            <p>Code du tour</p>
            <InputText id="codeTourInput" :model-value="codeTour" placeholder="123456" class="w-3/5"/>
        <BlackRoundButton text="Participer" @click="fetchTour()" />
        </div>
    </div>
</template>
<script setup lang="ts">
import InputText from '@/components/generics/InputText.vue';
import ApiService from '@/services/ApiService';
import { useRoutingService } from '@/services/routingService';
import { ref } from 'vue';
import BlackRoundButton from '@/components/generics/BlackRoundButton.vue';
import { TourResultat } from '@/model/TourResultat';
import { useResultatTourStore } from '@/stores/ResultatTourStore';

const routingService = useRoutingService();


const codeTour =  ref("");
const store = useResultatTourStore();

function fetchTour() {
    ApiService.getTourByCode(codeTour.value)
    .then((tourResultat: TourResultat) => {
        store.setTourResultat(tourResultat)
        routingService.goToActivities();
    })
    .catch((error) => {
        console.log(error);
    })
}



</script>
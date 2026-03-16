<template>
    <div class="flex flex-col items-center" :style="{ backgroundImage: `url(${bgImage})` }">
        <h2 class="text-2xl font-bold"> Sélectionne une activité</h2>
        <ActiviteesListe :activitees="activitees" @select="onSelect" />
    </div>
</template>
<script setup lang="ts">
import ActiviteesListe from '@/components/strava/ActiviteesListe.vue';
import { StravaActivitee } from '@/model/StravaActivitee';
import ApiService from '@/services/ApiService';
import { useRoutingService } from '@/services/routingService';
import { onMounted, ref } from 'vue';
import bgImage from '@/assets/images/background/background-light.png';


const activitees = ref([] as StravaActivitee[]);
const routingService = useRoutingService()

onMounted(() => {
    ApiService.getStravaActivities().then(
        (activiteesFetch) => {
            activitees.value = activiteesFetch;
        }
    );
});

const onSelect = (activitee: StravaActivitee) => {
    ApiService.loadResultTourFromStrava(activitee.id, '123').then(
        (resultat) => {
            console.log(resultat);
            routingService.goToResult();
        }
    );
};

</script>

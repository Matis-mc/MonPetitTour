<template>
    <div class="flex flex-col items-center">
        <h2 class="text-2xl my-2 font-bold"> Sélectionne une activité</h2>
        <ActiviteesListe :activitees="activitees" @select="onSelect" />
    </div>
</template>
<script setup lang="ts">
import ActiviteesListe from '@/components/strava/ActiviteesListe.vue';
import { StravaActivitee } from '@/model/StravaActivitee';
import ApiService from '@/services/ApiService';
import { useRoutingService } from '@/services/RoutingService';
import { onMounted, ref } from 'vue';
import bgImage from '@/assets/images/background/background-light.png';
import { useResultatTourStore } from '@/stores/ResultatTourStore';
import { mapToTourResultat } from '@/mapper/TourResultatMapper';

const loading = ref(false);

const activitees = ref([] as StravaActivitee[]);
const routingService = useRoutingService();
const userResultat = useResultatTourStore();

onMounted(() => {
    loading.value = true;
    ApiService.getStravaActivities().then(
        (activiteesFetch) => {
            activitees.value = activiteesFetch;
        }
    ).finally(() => {
        loading.value = false;
    });
});

const onSelect = (activitee: StravaActivitee) => {
    loading.value = true;
    console.log("Activity : ", activitee);
    console.log("tour id : ", userResultat.tourResultat);
    ApiService.loadResultTourFromStrava(activitee.id, userResultat.tourResultat.getId()).then(
        (resultat) => {
            console.log(resultat);
            userResultat.setTourResultat(mapToTourResultat(resultat));
            routingService.goToResult();
        }
    ).finally(() => {
        loading.value = false;
    });
};

</script>

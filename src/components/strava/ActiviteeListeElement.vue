<template>
    <div class="grid grid-cols-5 p-2 my-6 mx-6 shadow-lg cursor-pointer bg-gradient-to-r from-white to-red-200 rounded-xl" @click="emit('select', activity)">
        <div class="col-span-1 flex items-center justify-center">
            <img class="w-12 h-12"  src="@/assets/images/tiers/logo-strava.png" alt="Logo Strava">
        </div>
        <div class="col-span-4 px-2 py-2 flex flex-col gap-1">
            <h2 class="font-bold text-stone-800 text-lg leading-none">{{ props.activity.name }}</h2>
            <p class="text-stone-500 text-sm">{{ mToKm(props.activity.distance) }}</p>
            <p class="text-stone-500 text-sm">{{ formatDate(props.activity.start_date) }}</p>
        </div>
    </div>
</template>     
<script setup lang="ts">
import { StravaActivitee } from '@/model/StravaActivitee';


const props = defineProps<{
    activity: StravaActivitee;
}>();

const emit = defineEmits<{
    select: [activity: StravaActivitee];
}>();


function mToKm(meter: number): string {
    return (meter / 1000).toFixed(2) + ' km';
}

function formatDate(date: Date): string {
    let dateToDisplay = new Date(date);
    return dateToDisplay.toLocaleDateString('fr-FR');
}


</script>
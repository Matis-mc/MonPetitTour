<template>
    <div class="grid grid-cols-5 p-2 m-4 shadow-lg cursor-pointer bg-stone-100 rounded-lg" @click="emit('select', activity)">
        <div class="col-span-1">
            <img class="w-12 h-12"  src="@/assets/images/tiers/logo-strava.png" alt="Logo Strava">
        </div>
        <div class="col-span-4">
            <h2>{{ props.activity.name }}</h2>
            <p>{{ props.activity.distance }}</p>
            <p>{{ props.activity.date }}</p>
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



</script>
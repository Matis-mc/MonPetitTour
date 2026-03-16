<template>
    <div class="flex flex-col gap-2 p-2 rounded bg-stone-100">
        <h2>{{ tour.name }}</h2>
        <p>{{ tour.date }}</p>
        <p>{{ tour.description }}</p>
    </div>
</template>

<script setup lang="ts">
import { TourResultat } from '@/model/TourResultat';

const props = defineProps({
    tour: {
        type: TourResultat  ,
        required: true
    }
});
</script>
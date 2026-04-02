<template>
    <div class="flex flex-col p-1 mt-1 bg-olive-50 border border-stone-200 shadow-sm">
        <div class="grid grid-cols-3 gap-4 px-2 py-1 items-center bg-stone-100 rounded-lg">
            <img :src="drapeaux" class="col-span-1" />
            <div class="col-span-2">
                <h1 class="font-bold text-stone-800 text-lg leading-none">{{props.tour.getName()}}</h1>
                <p class="text-stone-500 text-sm">{{props.tour.getDescription()}}</p>
                <p class="text-stone-500 text-sm">{{props.tour.getRanking().getGeneral().length}} participants</p>
                <p class="text-stone-500 text-sm">{{props.tour.getSegments().length}} segments</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { TourResultat } from '@/model/TourResultat';
import drapeaux from '@/assets/images/icones/drapeau.png';

const props = defineProps({
    tour: {
        type: TourResultat  ,
        required: true
    }
});

</script>
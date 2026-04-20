<template>
    <div class="flex flex-col mx-6 my-3 bg-slate-100 shadow-lg rounded-xl">
        <img :src="tourBanner" class="w-full h-32 object-cover rounded-t-xl" />
        <div class="grid grid-cols-3 gap-4 p-4 items-center rounded-lg">
            <div class="col-span-2">
                <h1 class="font-bold text-stone-800 text-lg leading-none">{{props.tour.getName()}}</h1>
                <p class="text-stone-500 text-sm">{{props.tour.getDescription()}}</p>
                <p class="text-stone-500 text-sm">{{props.tour.getRanking().getGeneral().length}} participants</p>
                <p class="text-stone-500 text-sm">{{props.tour.getSegments().length}} segments</p>
            </div>
            <div class="col-span-1 flex flex-col gap-1">
                <button class="bg-neutral-800 text-white px-2 py-1 rounded-lg text-sm" @click="goToParticipation(tour)">Participer</button>
                <button class="bg-stone-200 text-stone-700 px-2 py-1 rounded-lg text-xs border border-stone-300 hover:bg-stone-300 transition-colors flex items-center justify-center gap-1" @click="downloadGPX(tour)">
                   <img src="@/assets/images/icones/ajout-fichier.png" class="w-3 h-3" />
                   GPX
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { TourResultat } from '@/model/TourResultat';
import tourBanner from '@/assets/images/background/carte.jpg';
import { useResultatTourStore } from '@/stores/ResultatTourStore';
import { useRoutingService } from '@/services/RoutingService';

const toursResultatStore = useResultatTourStore();
const routingService = useRoutingService();

const props = defineProps({
    tour: {
        type: TourResultat  ,
        required: true
    }
});

const goToParticipation = (tour: TourResultat) => {
    toursResultatStore.setTourResultat(tour);
    routingService.goToActivities();
}

const downloadGPX = (tour: TourResultat) => {
    const content = tour.getGpxFile();
    if (!content) {
        alert("Fichier GPX non disponible.");
        return;
    }

    let blob: Blob;
    if (content instanceof Blob) {
        blob = content;
    } else {
        blob = new Blob([content as unknown as string], { type: 'application/gpx+xml' });
    }

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${tour.getName().replace(/\s+/g, '_')}.gpx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

</script>
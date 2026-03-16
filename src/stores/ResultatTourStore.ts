import { TourResultat } from "@/model/TourResultat";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useResultatTourStore = defineStore('ResultatTour', () => {
    const tourResultat = ref(new TourResultat('', '', '', new Date(), []));

    function setTourResultat(resultat: TourResultat) {
        tourResultat.value.name = resultat.name;
        tourResultat.value.description = resultat.description;
        tourResultat.value.date = resultat.date;
        tourResultat.value.segments = resultat.segments;
    }

    function resetTourResultat() {
        tourResultat.value = new TourResultat('', '', '', new Date(), []);
    }

    return { tourResultat, setTourResultat, resetTourResultat };
}); 
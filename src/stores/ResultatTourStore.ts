import { TourResultat } from "@/model/TourResultat";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useResultatTourStore = defineStore('ResultatTour', () => {
    const tourResultat = ref();

    function setTourResultat(resultat: TourResultat) {
        tourResultat.value = resultat;
    }

    function resetTourResultat() {
        tourResultat.value = null;
    }

    return { tourResultat, setTourResultat, resetTourResultat };
}); 
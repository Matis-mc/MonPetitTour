import { TourResultat } from "@/model/TourResultat";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useResultatTourStore = defineStore('ResultatTour', () => {
    const tourResultat = ref<TourResultat>();

    function setTourResultat(resultat: TourResultat) {
        tourResultat.value = resultat;
    }

    function resetTourResultat() {
        tourResultat.value = undefined;
    }

    function getTourResultat() {
        return tourResultat.value;
    }

    return { tourResultat, setTourResultat, resetTourResultat, getTourResultat };
}); 
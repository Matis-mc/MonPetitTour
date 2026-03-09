import { TourCreation } from "@/model/TourCreation";
import { TourResultat } from "@/model/TourResultat";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useTourStore = defineStore('tour', () => {
    const tourCreation = ref(new TourCreation('', '', new Date(), []));
    const tourResultat = ref(new TourResultat('', '', '', new Date(), []));

    function setTourCreation(newTour: TourCreation) {
        tourCreation.value.name = newTour.name;
        tourCreation.value.description = newTour.description;
        tourCreation.value.date = newTour.date;
        tourCreation.value.segments = newTour.segments;
    }

    function resetTourCreation() {
        tourCreation.value = new TourCreation('', '', new Date(), []);
    }

    function setTourResultat(resultat: TourResultat) {
        tourResultat.value.name = resultat.name;
        tourResultat.value.description = resultat.description;
        tourResultat.value.date = resultat.date;
        tourResultat.value.segments = resultat.segments;
    }

    function resetTourResultat() {
        tourResultat.value = new TourResultat('', '', '', new Date(), []);
    }

    return { tourCreation, setTourCreation, resetTourCreation, tourResultat, setTourResultat, resetTourResultat };
}); 
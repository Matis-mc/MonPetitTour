import { TourCreation } from "@/model/TourCreation";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useTourStore = defineStore('tour', () => {
    const tourCreation = ref(new TourCreation('', '', new Date(), []));

    function setTourCreation(newTour: TourCreation) {
        tourCreation.value.name = newTour.name;
        tourCreation.value.description = newTour.description;
        tourCreation.value.date = newTour.date;
        tourCreation.value.segments = newTour.segments;
    }

    function resetTourCreation() {
        tourCreation.value = new TourCreation('', '', new Date(), []);
    }

    return { tourCreation, setTourCreation, resetTourCreation };
}); 
import { TourCreation } from "@/model/TourCreation";
import { defineStore } from "pinia";

export const useTourStore = defineStore('tour', {
    state: () => ({
        tourCreation: new TourCreation('', '', new Date(), [])
    }),
    getters: {
        getTourCreation(state): TourCreation {
            return state.tourCreation;
        }
    },
    actions: {
        setTourCreation(tourCreation: TourCreation) {   
            this.tourCreation = tourCreation;
        }            
    }
}); 
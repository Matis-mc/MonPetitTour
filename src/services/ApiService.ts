import { TourCreation } from "@/model/TourCreation";
import HttpService from "./HttpService";
import { TourResultat } from "@/model/TourResultat";
import { StravaActivitee } from "@/model/StravaActivitee";

class ApiService {

    async createTour(tourCreation: TourCreation) {
        await HttpService.createTour(tourCreation)
            .then((response) => {
                return HttpService.uploadGpxFile(tourCreation.gpxFile!, response.id);
            })
            .catch((error) => {
                console.error('Error creating tour:', error);
                return null;
            });
    }

    async getTours() {
        let tours = [new TourResultat("Mon petit tour", "123", "Sacré balade", new Date(), [], 0), new TourResultat("Mon petit tour", "123", "Sacré balade", new Date(), [], 0)];
        return tours;
        //return await HttpService.getTours();
    }

    async getTourByCode(code: string) {
        let tour = new TourResultat("Mon petit tour", "123", "Sacré balade", new Date(), [], 0)
        return tour;
        //return await HttpService.getTourByCode(code);
    }

    async getStravaActivities() {
        let activitees = [new StravaActivitee("1", "Activité 1", 10, new Date()), new StravaActivitee("2", "Activité 2", 20, new Date())];
        return activitees;
        //return await HttpService.getStravaActivities();
    }

    async loadResultTourFromStrava(activityId: string, codeTour: string) {
        let tour = new TourResultat("Mon petit tour", "123", "Sacré balade", new Date(), [], 0)
        return tour;
        //return await HttpService.loadResultTourFromStrava(activityId, codeTour);
    }


}
export default new ApiService();   
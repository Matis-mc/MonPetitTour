import { TourCreation } from "@/model/TourCreation";
import HttpService from "./HttpService";

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
        return await HttpService.getTours();
    }

    async getTourByCode(code: string) {
        return await HttpService.getTourByCode(code);
    }

    async getStravaActivities() {
        return await HttpService.getStravaActivities();
    }

    async loadResultTourFromStrava(activityId: string, codeTour: string) {
        return await HttpService.loadResultTourFromStrava(activityId, codeTour);
    }


}
export default new ApiService();   
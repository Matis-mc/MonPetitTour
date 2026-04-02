import { TourCreation } from "@/model/TourCreation";
import HttpService from "./HttpService";
import { getCategoryName } from "@/constants/categories";

class ApiService {

    async createTour(tourCreation: TourCreation) {
        tourCreation.segments.forEach((segment) => {
            segment.category = getCategoryName(segment.category);
        });

        const response = await HttpService.createTour(tourCreation);
        return await HttpService.uploadGpxFile(tourCreation.gpxFile!, response.id);
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

    async loadResultTourFromStrava(activityId: string, tourId: string) {
        return await HttpService.loadResultTourFromStrava(activityId, tourId);
    }


}
export default new ApiService();   

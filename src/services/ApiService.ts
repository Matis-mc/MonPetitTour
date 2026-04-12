import { TourCreation } from "@/model/TourCreation";
import HttpService from "./HttpService";
import { getCategoryName } from "@/constants/categories";
import { mapToTourResultatWithoutRankings } from "@/mapper/TourResultatMapper";

class ApiService {

    async createTour(tourCreation: TourCreation, gpxFile: File) {
        tourCreation.segments.forEach((segment) => {
            segment.category = getCategoryName(segment.category);
        });

        const response = await HttpService.createTour(tourCreation);
        let tourResultat = mapToTourResultatWithoutRankings(response);
        console.log(tourCreation.getGpxFile())
        return await HttpService.uploadGpxFile(gpxFile, String(tourResultat.getId()));
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

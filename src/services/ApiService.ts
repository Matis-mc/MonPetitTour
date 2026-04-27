import { TourCreation } from "@/model/TourCreation";
import HttpService from "./HttpService";
import { getCategoryName } from "@/constants/categories";
import { mapToTourResultat, mapToTourResultatWithoutRankings } from "@/mapper/TourResultatMapper";

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
        const response = await HttpService.getTours();
        return response.map((t: any) => {
            if (t.rankings) {
                return mapToTourResultat(t);
            } else {
                return mapToTourResultatWithoutRankings(t);
            }
        });
    }

    async getTourByCode(code: string) {
        const response = await HttpService.getTourByCode(code);
        if (response.rankings) {
            return mapToTourResultat(response);
        } else {
            return mapToTourResultatWithoutRankings(response);
        }
    }

    async loadResultTourFromFitFile(file: File, tourId: number) {
        return await HttpService.loadResultTourFromFitFile(file, tourId);
    }


}
export default new ApiService();   

import { TourCreation } from "@/model/TourCreation";
import HttpService from "./HttpService";

class ApiService {

    async createTour(tourCreation: TourCreation) {
        return await HttpService.createTour(tourCreation);
    }

    async getTours() {
        return await HttpService.getTours();
    }

    async getTourByCode(code: string) {
        return await HttpService.getTourByCode(code);
    }


}
export default new ApiService();   
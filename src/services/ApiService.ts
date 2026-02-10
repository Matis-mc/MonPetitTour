import { TourCreation } from "@/model/TourCreation";
import HttpService from "./HttpService";

class ApiService {

    async createTour(tourCreation: TourCreation) {
        return await HttpService.createTour(tourCreation);
    }

    async getTours() {
        return await HttpService.getTours();
    }


}
export default new ApiService();   
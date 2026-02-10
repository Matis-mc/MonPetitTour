import { TourCreation } from "@/model/TourCreation";

const BASE_URL = 'http://localhost:8080/api';

class HttpService {

    async createTour(tourCreation: TourCreation) {
        const response = await fetch(`${BASE_URL}/tours`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tourCreation)
        });
        if (!response.ok) {
            throw new Error('Failed to create tour');
        }
        return await response.json();
    }

    async getTours() {
        const response = await fetch(`${BASE_URL}/tours`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch tours');
        }
        return await response.json();
    }
}

export default new HttpService();   
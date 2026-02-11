import { TourCreation } from "@/model/TourCreation";

const BASE_URL = 'http://localhost:8080/api';

class HttpService {

    async createTour(tourCreation: TourCreation) {
        console.log('Sending tour creation request:', JSON.stringify(tourCreation));
        const formData = new FormData()
        formData.append('name', tourCreation.name)
        formData.append('date', tourCreation.date.toISOString())
        formData.append('description', tourCreation.description)
        formData.append('file', tourCreation.gpxFile)
        formData.append('segments', tourCreation.segments)

        const response = await fetch(`${BASE_URL}/tours`, {
            method: 'POST',
            body:formData,
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
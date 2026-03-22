import { TourCreation } from "@/model/TourCreation";

const BASE_URL = 'http://localhost:8080/api';

class HttpService {

    async createTour(tourCreation: TourCreation) {
        console.log('Sending tour creation request:', JSON.stringify(tourCreation));

        const response = await fetch(`${BASE_URL}/tours`, {
            method: 'POST',
            body: JSON.stringify(tourCreation),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Failed to create tour');
        }
        return await response.json();
    }

    async uploadGpxFile(file: File, idTour: string) {
        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch(`${BASE_URL}/tours/${idTour}/gpx`, {
            method: 'POST',
            body: formData,
        });
        if (!response.ok) {
            throw new Error('Failed to upload gpx file');
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

    async getTourByCode(code: string) {
        const response = await fetch(`${BASE_URL}/tours/${code}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch tour by code');
        }
        return await response.json();
    }

    async getStravaActivities() {
        const response = await fetch(`${BASE_URL}/strava/activities`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch strava activities');
        }
        return await response.json();
    }

    async loadResultTourFromStrava(activityId: string, codeTour: string) {
        const response = await fetch(`${BASE_URL}/strava/activities/${activityId}/${codeTour}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch strava activities');
        }
        return await response.json();
    }
}

export default new HttpService();   
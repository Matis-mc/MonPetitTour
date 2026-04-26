import axios from 'axios'
import { TourCreation } from "@/model/TourCreation";
import { useAuthStore } from '@/stores/AuthStore';

const BASE_URL = 'https://mpt-z3u7.onrender.com/api';

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor for adding the bearer token
apiClient.interceptors.request.use(
    (config) => {
        const authStore = useAuthStore();
        if (authStore.accessToken) {
            config.headers.Authorization = `Bearer ${authStore.accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor for handling 401 and refreshing the token
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const authStore = useAuthStore();

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const newAccessToken = await authStore.refreshAccessToken();
                if (newAccessToken) {
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return apiClient(originalRequest);
                }
            } catch (refreshError) {
                authStore.clearTokens();
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

class HttpService {

    async createTour(tourCreation: TourCreation) {
        console.log('Sending tour creation request:', JSON.stringify(tourCreation));
        const response = await apiClient.post('/tours', tourCreation);
        return response.data;
    }

    async uploadGpxFile(file: File, idTour: string) {
        const formData = new FormData()
        formData.append('file', file)

        const response = await apiClient.post(`/tours/${idTour}/gpx`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    }

    async getTours() {
        const response = await apiClient.get('/tours');
        return response.data;
    }

    async getTourByCode(code: string) {
        const response = await apiClient.get(`/tours/${code}`);
        return response.data;
    }

    async loadResultTourFromFitFile(file: File, tourId: string) {
        const formData = new FormData()
        formData.append('file', file)

        const response = await apiClient.post(`/tours/${tourId}/fit`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    }
}

export default new HttpService();
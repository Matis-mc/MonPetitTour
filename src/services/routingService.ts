import { useRouter } from "vue-router";
import { Router } from "vue-router";

class RoutingService {
    private static instance: RoutingService | null = null;
    private router: Router;

    private constructor(router: Router) {
        this.router = router;
    }

    static getInstance(): RoutingService {
        if (!RoutingService.instance) {
            RoutingService.instance = new RoutingService(useRouter());
        }
        return RoutingService.instance;
    }

    goToCreateTour() {
        this.router.push('/tour/upload');
    }

    goToRejoindreTour() {
        this.router.push('/');
    }

    goToRanking() {
        this.router.push('/tour/ranking');
    }

    gotoMap() {
        this.router.push('/map');
    }

    gotoConfirmation() {
        this.router.push('/tour/confirmation');
    }

    goToHome() {
        this.router.push('/');
    }
}

export const useRoutingService = () => RoutingService.getInstance();   
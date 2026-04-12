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
        this.router.push('/creation/upload');
    }

    goToCreationSegmentRanking() {
        this.router.push('/creation/segment/ranking');
    }

    goToRejoindreTour() {
        this.router.push('/search/tour');
    }

    goToActivities() {
        this.router.push('/search/activities');
    }

    goToResult() {
        this.router.push('/result/tour');
    }

    goToCategorieRanking() {
        this.router.push('/result/ranking/categorie');
    }

    goToSegmentRanking() {
        this.router.push('/result/ranking/segment');
    }

    gotoMap() {
        this.router.push('/creation/map');
    }

    gotoConfirmation() {
        this.router.push('/creation/confirmation');
    }

    goToHome() {
        this.router.push('/');
    }
}

export const useRoutingService = () => RoutingService.getInstance();   
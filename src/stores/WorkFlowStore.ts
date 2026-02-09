import { defineStore} from 'pinia';
import { useRouter } from 'vue-router';
import { TOUR_STEPS_ROUTES } from '../constants/toursteps';


export const useWorkFlowStore = defineStore('workflow', {
    state: () => ({
        segmentModalVisible: false
    }),
    getters: {
        isSegmentModalVisible(state) {
            return state.segmentModalVisible;
        }
    },
    actions: {
        getCurrentStepIndex(): number {
            const router = useRouter();
            const currentPath = router.currentRoute.value.path;
            const currentRoute = currentPath.split('/').pop();
            return TOUR_STEPS_ROUTES.indexOf(currentRoute as string);
        },
        navigateToStep(offset: number) {
            const currentIndex = this.getCurrentStepIndex();
            const nextIndex = currentIndex + offset;
            
            if (nextIndex >= 0 && nextIndex < TOUR_STEPS_ROUTES.length) {
                const router = useRouter();
                const nextRoute = TOUR_STEPS_ROUTES[nextIndex];
                router.push(`/tours/${nextRoute}`);
            }
        },
        nextStep() {
            this.navigateToStep(1);
        },
        previousStep() {
            this.navigateToStep(-1);
        },
        openSegmentModal() {
            this.segmentModalVisible = true;
        },
        closeSegmentModal() {
            this.segmentModalVisible = false;
        }
    }

});
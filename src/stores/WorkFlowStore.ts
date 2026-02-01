import { defineStore} from 'pinia';


export const useWorkFlowStore = defineStore('workflow', {
    state: () => ({
        currentStep: 0,
        segmentModalVisible: false
    }),
    getters: {
        getCurrentStep(state) {
            return state.currentStep;
        },
        isSegmentModalVisible(state) {
            return state.segmentModalVisible;
        }
    },
    actions: {
        setCurrentStep(step: number) {
            console.log('WorkFlowStore: setCurrentStep called with', step);
            this.currentStep = step;
        },
        nextStep() {
            this.currentStep += 1;
            console.log('WorkFlowStore: nextStep called, currentStep is now', this.currentStep);
        },
        previousStep() {
            if (this.currentStep > 0) {
                this.currentStep -= 1;
            }
        },
        openSegmentModal() {
            this.segmentModalVisible = true;
        },
        closeSegmentModal() {
            this.segmentModalVisible = false;
        }
    }

});
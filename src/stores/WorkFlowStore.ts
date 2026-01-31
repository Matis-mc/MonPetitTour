import { defineStore} from 'pinia';


export const useWorkFlowStore = defineStore('workflow', {
    state: () => ({
        currentStep: 0
    }),
    getters: {
        getCurrentStep(state) {
            return state.currentStep;
        }
    },
    actions: {
        setCurrentStep(step: number) {
            console.log('WorkFlowStore: setCurrentStep called with', step);
            this.currentStep = step;
        },
        nextStep() {
            this.currentStep += 1;
        },
        previousStep() {
            if (this.currentStep > 0) {
                this.currentStep -= 1;
            }
        }
    }

});
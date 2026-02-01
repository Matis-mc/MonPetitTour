<template>
    <div 
        @click="isEditing = true"
        :class="['w-12 h-12 flex flex-col justify-center rounded-lg items-center mx-1 cursor-pointer', bgColor]"
    >
        <p class="text-sm">{{ positionValue }}</p>
        <div v-if="!isEditing" class="font-bold text-lg">{{ rankValue }}</div>
        <input 
            v-else
            v-model.number="editValue"
            type="number"
            @blur="saveValue"
            @keyup.enter="saveValue"
            @click.stop
            class="w-12 h-8 text-center border border-blue-500 rounded"
            autofocus
        />
    </div>
</template>

<script setup lang="ts">
import { useMapStore } from '@/stores/MapStore';
import { ref, watch, computed } from 'vue';
    
const mapStore = useMapStore();
const isEditing = ref(false);
const editValue = ref<number>(0);

const props = defineProps({
        rankValue: {
            type: Number,
            required: true
        },
        positionValue: {
            type: Number,
            required: true
        },
        segmentIndex: {
            type: Number,
            required: true
        }
    })

const bgColor = computed(() => {
    switch(props.positionValue) {
        case 1:
            return 'bg-yellow-400';
        case 2:
            return 'bg-gray-400';
        case 3:
            return 'bg-orange-300';
        default:
            return 'bg-gray-200';
    }
})

watch(() => props.rankValue, (newValue) => {
    editValue.value = newValue;
}, { immediate: true })

const saveValue = () => {
    if (editValue.value !== null && editValue.value !== undefined) {
        mapStore.updateSegmentRanking(props.segmentIndex, props.positionValue-1, editValue.value);
    }
    isEditing.value = false;
}
</script>
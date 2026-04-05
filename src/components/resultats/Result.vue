<template>
    <div :class="['flex flex-col w-full items-center px-2 pb-2 rounded-xl shadow-md transition-all duration-300', categoryColors]">
        <div class="flex flex-col w-full items-center">
            <img v-if="result.getRank() <= 3"
                :src="imageUrl" 
                alt="Ranking decoration" 
                class="w-16 h-16 rounded-full"/>
            <span v-if="result.getRank() > 3" 
                class="text-4xl font-bold px-2 py-3 rounded-full">
                {{ result.getRank() }}
            </span>
        </div>
        <div class="flex text-right">
            <p class="bg-stone-800 text-white text-xs font-bold px-2 py-1 mt-1 rounded-full">{{ result.getScore() }} pts</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getCategoryName, getIconeFromCategory } from '@/constants/categories';
import { Ranking } from '@/model/Ranking';
import { computed, onMounted, ref } from 'vue';
import or from '@/assets/images/icones/medaille_or.png';
import argent from '@/assets/images/icones/medaille_argent.png';
import bronze from '@/assets/images/icones/medaille_bronze.png';

const categoryColors = computed(() => {
    switch (props.category) {
        case 'G': return 'bg-yellow-100';
        case 'S': return 'bg-green-500';
        case 'D': return 'bg-blue-100';
        case 'M': return 'bg-red-100';
        default: return 'bg-neutral-200';
    }
});


const imageUrl = ref("");

const props = defineProps({
    result: {
        type: Ranking,
        required: true
    },
    category: {
        type: String,
        required: true
    }
});

onMounted(() => {
    console.log("Result", props.result);
    switch (props.result.getRank()) {
        case 1:
            imageUrl.value = or;
            break;
        case 2:
            imageUrl.value = argent;
            break;
        case 3:
            imageUrl.value = bronze;
            break;
        default:
            imageUrl.value = getIconeFromCategory(props.category);
            break;
    }
})

</script>
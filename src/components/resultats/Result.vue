<template>
    <div class="flex flex-col w-full border-t border-stone-200 items-center bg-olive-50">
        <div class="flex flex-col w-full items-center">
            <img 
                :src="imageUrl" 
                alt="Category Icon" 
                class="w-16 h-16 rounded-full border-2 border-stone-50 shadow-sm"/>
            <span v-if="result.getRank() > 3" class="text-2xl font-bold px-2 py-0.5 rounded-full">
                {{ result.getRank() }}
            </span>
        </div>
        <div class="flex text-right">
            <p class="bg-stone-800 text-white text-xs font-bold px-2 py-0.5 rounded-full border-2">{{ result.getScore() }} pts</p>
        </div>
        <div class="flex flex-col flex-1">
            <p class="font-bold text-stone-800 text-lg">{{getCategoryName(category) }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getCategoryName, getIconeFromCategory } from '@/constants/categories';
import { Ranking } from '@/model/Ranking';
import { onMounted, ref } from 'vue';
import or from '@/assets/images/icones/medaille_or.png';
import argent from '@/assets/images/icones/medaille_argent.png';
import bronze from '@/assets/images/icones/medaille_bronze.png';


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
<template>
    <div :class="['p-4 rounded-xl m-2 shadow-lg justify-center', bgColor]">
        <h3 class="text-xl text-center font-semibold mb-2">{{ categorie }}</h3>
        <div v-for="(segment, index) in segments" :key="index">
            <SegmentRankComponent :segment="segment" :segment-index="index"/>
        </div>
    </div>  
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Segment } from '../../model/Segment';
import SegmentRankComponent from './SegmentRankComponent.vue';

const props = defineProps({
    categorie: {
        type: String,
        required: true
    },
    segments: {
        type: Array as () => Array<Segment>,
        required: true
    }
})

const bgColor = computed(() => {
    switch(props.categorie) {
        case "sprint":
            return 'border-l-4 border-emerald-500';
        case "mountain":
            return 'border-l-4 border-red-400';
        case "descent":
            return 'border-l-4 border-blue-300';
        default:
            return 'border-l-4 border-yellow-200';
    }
})

</script>
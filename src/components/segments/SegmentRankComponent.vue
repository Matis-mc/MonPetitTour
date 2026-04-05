<template>
    <div class="p-4 grid grid-cols-6 gap-4 items-center justify-items-center">
        <div class="col-span-3">
            <div class="font-semibold">n°{{segmentIndex + 1}}</div>
            <p>{{ segment.distance.toFixed(1) }}m  {{ segment.slope.toFixed(1) }}%</p>
        </div>
        <div class="flex col-span-3">
            <SegmentRankElement 
                v-for="(rank, index) in segment.points" 
                :key="index" 
                :rankValue="rank" 
                :positionValue="index + 1" 
                :segment-index="props.segmentIndex"/>
        </div>
    </div>
    
</template>
<script setup lang="ts">
import { Segment } from '@/model/Segment';
import SegmentRankElement from './RankElement.vue';

    const props = defineProps({
        segment: {
            type: Segment,
            required: true
        },
        segmentIndex: {
            type: Number,
            required: true
        }    
    })

</script>
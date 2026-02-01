<template>
    <div class="p-4 border-b grid grid-cols-6 gap-4 items-center justify-items-center">
        <div class="font-semibold">n°{{segmentIndex + 1}}</div>
        <div class="col-span-2">
            <p>{{ segment.distance.toFixed(1) }}m</p>
            <p>{{ segment.slope.toFixed(1) }}%</p>
        </div>
        <div class="flex col-span-3">
            <SegmentRankElement 
                v-for="(rank, index) in segment.ranking" 
                :key="index" 
                :rankValue="rank" 
                :positionValue="index + 1" 
                :segment-index="props.segmentIndex"/>
        </div>
    </div>
    
</template>
<script setup lang="ts">
import { Segment } from '@/model/Segment';
import SegmentRankElement from './SegmentRankElement.vue';

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
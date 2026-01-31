<template>
    <div class="p-4 border-b">
        <h3 class="text-xl font-semibold mb-2">Catégorie : {{ categorie }}</h3>
        <div v-for="(segment, index) in segments" :key="index">
            <SegmentRankComponent :segment="segment" />
        </div>
    </div>  
</template>

<script setup lang="ts">
import { Segment } from '../model/Segment';
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

</script>
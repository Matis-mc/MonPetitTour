<template>
    <div class="flex-col item-center w-full shadow-md border">
        <h3>Segments ajoutés au tour</h3>
        <div v-for="(segment, index) in segments" :key="index">
            <SegmentListElement :segment="segment" :numero="index + 1" :index="index" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { useMapStore } from '@/stores/MapStore';
import { computed } from 'vue';
import SegmentListElement from './SegmentListElement.vue';

    const mapStore = useMapStore();
    const segments = computed(() => mapStore.getSegments);

</script>
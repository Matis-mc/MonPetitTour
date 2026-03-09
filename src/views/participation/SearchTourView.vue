<template>
    <div class="flex w-2/3 min-w-80 flex-col items-center justify-center" :style="{ backgroundImage: `url(${bgImage})` }">
        <SearchTourComponent />
    </div>
</template>
<script setup lang="ts">
import SearchTourComponent from '@/components/tours/SearchTourComponent.vue';
import bgImage from '@/assets/images/background/background-light.png';

</script>
<template>
    <div class="p-4 border-b">
        <p>Segment de {{ segment.distance.toFixed(1) }}m</p>
        <p>Catégorie : {{ segment.categorie }}</p>
    </div>
    
</template>
<script setup lang="ts">
import { Segment } from '@/model/Segment';


    const props = defineProps({
        segment: {
            type: Segment,
            required: true
        }    
    })

</script>
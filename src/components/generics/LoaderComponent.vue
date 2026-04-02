<template>
    <div class="flex flex-col items-center justify-center">
        <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-olive-500"></div>
        <p class="text-stone-500 text-xl">{{ message }}</p>
    </div>
</template>
<script setup lang="ts">

const props = defineProps({
    message: {
        type: String,
        required: true
    }
})

</script>


<template>
    <div class="flex flex-col items-center gap-2 p-4 mx-4 shadow-md rounded-xl bg-gray-100">
        <div class="flex flex-col items-center gap-2">
            <p>Code du tour</p>
            <InputText id="codeTourInput" :model-value="codeTour" placeholder="123456" class="w-3/5"/>
        <BlackRoundButton text="Participer" @click="emit('searchTour', codeTour)" />
        </div>
    </div>
</template>
<script setup lang="ts">
import InputText from '@/components/generics/InputText.vue';
import { ref } from 'vue';
import BlackRoundButton from '@/components/generics/BlackRoundButton.vue';


const codeTour =  ref("");

const emit = defineEmits<{
        searchTour: [codeTour: string];
    }>();


</script>
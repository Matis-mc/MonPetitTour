<template>
    <div class="flex justify-between w-full p-2 bg-white/40 backdrop-blur-md shadow-sm border-b border-white/20">
        <img src="@/assets/images/logo/logo.png" alt="Mon Petit Tour Logo" class="h-10"/>
        <img :src="img" alt="" class="h-10 rounded-full">
    </div>
</template>
<script setup lang="ts">
import { useAuthStore } from '@/stores/AuthStore';
import { onMounted, ref } from 'vue';


const authStore = useAuthStore();
const user = ref();
const img = ref();

onMounted(() => {
    user.value = authStore.getUser();
    img.value = user.value?.profile_medium;
});

</script>   
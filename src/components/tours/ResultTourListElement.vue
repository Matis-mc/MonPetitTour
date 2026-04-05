<template>
    <div class="flex flex-col p-2 m-2 bg-slate-100 border border-neutral-200 rounded-lg">
        <div v-if="userResult.length > 0" class="grid grid-cols-3 gap-4">
            <div class="col-span-2 pt-2">
                <h1 class="font-bold text-2xl">{{props.tour.getName()}}</h1>
                <p class="text-stone-500 text-m my-2">{{props.tour.getDescription()}}</p>
                <p class="text-stone-500 text-sm">{{props.tour.getRanking().getGeneral().length}} participants</p>
            </div>
            <Result :result="userResult[0].rank!" :category="userResult[0].category"
            class="col-span-1" />
        </div>
        <p class="text-stone-700 text-sm mt-2 text-center">Par catégories</p>
        <div v-if="userResult.length > 1" class="flex flex-row gap-4 py-1 my-2 items-center">
            <div v-for="res in userResult.slice(1)" :key="res.category">
                <Result :result="res.rank!" :category="res.category" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { TourResultat } from '@/model/TourResultat';
import { useAuthStore } from '@/stores/AuthStore';
import { onMounted, ref } from 'vue';
import Result from '../resultats/Result.vue';
import RankingService from '@/services/RankingService';

const authStore = useAuthStore();
const user = ref(authStore.user);
const userResult = ref([]);

const props = defineProps({
    tour: {
        type: TourResultat  ,
        required: true
    }
});

onMounted(() => {

    userResult.value = RankingService.getUserResult(props.tour, user);

})

</script>
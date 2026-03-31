<template>
    <div class="flex flex-col gap-3 p-1 mt-1 bg-stone-50 border border-stone-200 shadow-sm">
        <div v-if="userResult.length > 0" class="grid grid-cols-3 gap-4 px-2 py-1 items-center bg-stone-100/50 rounded-lg">
            <Result :result="userResult[0].rank!" :category="userResult[0].category" class="col-span-1" />
            <div class="col-span-2">
                <h1 class="font-bold text-stone-800 text-lg leading-none">{{props.tour.getName()}}</h1>
                <p class="text-stone-500 text-sm">{{props.tour.getDescription()}}</p>
                <p class="text-stone-500 text-sm">{{props.tour.getRanking().getGeneral().length}} participants</p>
            </div>
        </div>
        <div v-if="userResult.length > 1" class="flex flex-row gap-4 px-2 py-1 items-center bg-stone-100/50 rounded-lg">
            <div v-for="res in userResult.slice(1)" :key="res.category">
                <Result :result="res.rank!" :category="res.category" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Ranking } from '@/model/Ranking';
import { TourResultat } from '@/model/TourResultat';
import { useAuthStore } from '@/stores/AuthStore';
import { onMounted, ref } from 'vue';
import Result from '../resultats/Result.vue';

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
    getUserResult();
})


const getUserResult = () => {

    let generalRank = getUserRank(props.tour.getRanking().getGeneral())
    let sprintRank = getUserRank(props.tour.getRanking().getSprint())
    let mountainRank = getUserRank(props.tour.getRanking().getMountain())
    let descentRank = getUserRank(props.tour.getRanking().getDescent())

    let allResults = [
        { "category": "G", "rank": generalRank },
        { "category": "S", "rank": sprintRank },
        { "category": "M", "rank": mountainRank },
        { "category": "D", "rank": descentRank }
    ]

    console.log("All user result", allResults);

    userResult.value = allResults.filter(r => r.rank != null);
}

const getUserRank = (ranks: Ranking[]) => {
    if(ranks === null || ranks === undefined) {
        return null;
    }
    // todo : à remettre quand ajout suer ok
    //return ranks.find((r: Ranking) => r.idUser === user.value?.id);
    return ranks[0];
}

</script>
<template>
    <div class="flex flex-col items-center gap-2 p-4 mx-4 shadow-md rounded-xl bg-gray-100">
        <h3 class="font-bold text-xl">{{ categoryName }}</h3>
        <div class="w-full overflow-x-auto max-h-96 overflow-y-auto pr-2">
            <table class="w-full text-left">
                <thead>
                    <tr class="border-b border-gray-300">
                        <th class="py-2 px-4">Rang</th>
                        <th class="py-2 px-4">Cycliste</th>
                        <th class="py-2 px-4">Points</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="rank in rankings" :key="rank.idUser" class="border-b border-gray-200">
                        <td class="py-2 px-4">{{ rank.rank }}</td>
                        <td class="py-2 px-4">{{ rank.firstName }} {{ rank.lastName }}</td>
                        <td class="py-2 px-4 font-mono">{{ rank.score }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Ranking } from '@/model/Ranking';

defineProps<{
    categoryName: string;
    rankings: Ranking[];
}>();
</script>

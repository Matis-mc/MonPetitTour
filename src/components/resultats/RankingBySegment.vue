<template>
    <div class="flex flex-col items-center gap-2 p-2 mx-4 shadow-md rounded-xl bg-gray-100 mb-6">
        <h3 class="font-bold text-xl">{{ segment.name }}</h3>
        <p class="text-sm text-gray-500 italic">{{ segment.categorie }} - Pente: {{ segment.slope }}%</p>
        <div class="w-full overflow-x-auto max-h-96 overflow-y-auto mt-2 pr-2">
            <table class="w-full text-left">
                <thead>
                    <tr class="border-b border-gray-300">
                        <th class="py-2 px-4">Rang</th>
                        <th class="py-2 px-4">Cycliste</th>
                        <th class="py-2 px-4">Temps (s)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(riderTime, index) in segment.ranking" :key="riderTime.rider.id" class="border-b border-gray-200">
                        <td class="py-2 px-4">{{ index + 1 }}</td>
                        <td class="py-2 px-4">{{ riderTime.rider.firstname }} {{ riderTime.rider.lastname }}</td>
                        <td class="py-2 px-4 font-mono text-emerald-600">{{ riderTime.time }}s</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { SegmentResultat } from '@/model/SegmentResultat';

defineProps<{
    segment: SegmentResultat;
}>();
</script>

<template>
    <div class="w-full h-full">
        <canvas ref="chartCanvas"></canvas>
    </div>
</template>

<!-- <script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { Chart, registerables } from 'chart.js'
import { useMapStore } from '@/stores/MapStore'


Chart.register(...registerables)

const mapStore = useMapStore()
const chartCanvas = ref<HTMLCanvasElement | null>(null)
let chartInstance: Chart | null = null

const createChart = () => {
    if (!chartCanvas.value) return

    const ctx = chartCanvas.value.getContext('2d')
    if (!ctx) return

    // Extract data from segments
    const labels: string[] = []
    const data: number[] = []
    const colors: string[] = []

    const gpx = mapStore.gpxFile; -->

    //console.log(getElevationData(gpx));

    // if (chartInstance) {
    //     chartInstance.destroy()
    // }

    // chartInstance = new Chart(ctx, {
    //     type: 'bar',
    //     data: {
    //         labels: labels,
    //         datasets: [{
    //             label: 'Gain d\'élévation (m)',
    //             data: data,
    //             backgroundColor: colors,
    //             borderColor: colors.map(c => c.replace('0.2', '1')),
    //             borderWidth: 1
    //         }]
    //     },
    //     options: {
    //         responsive: true,
    //         maintainAspectRatio: false,
    //         plugins: {
    //             legend: {
    //                 display: false
    //             },
    //             title: {
    //                 display: true,
    //                 text: 'Profil altimétrique'
    //             }
    //         },
    //         scales: {
    //             y: {
    //                 beginAtZero: true,
    //                 title: {
    //                     display: true,
    //                     text: 'Élévation (m)'
    //                 }
    //             },
    //             x: {
    //                 title: {
    //                     display: true,
    //                     text: 'Segments'
    //                 }
    //             }
    //         }
    //     }
    // })
//
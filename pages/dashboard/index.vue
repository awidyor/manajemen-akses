<template>
  <div>
    <NuxtLayout>
      <h1 class="mb-4 text-2xl font-semibold tracking-tight scroll-m-20">
        Overview
      </h1>
      <div class="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCardOverview title="Total Jabatan" :value="statsData.jabatan">
          <template #icon>
            <ChartPieIcon class="w-4 h-4 text-muted-foreground" />
          </template>
        </DashboardCardOverview>
        <DashboardCardOverview title="Total User" :value="statsData.user">
          <template #icon>
            <ChartBarIcon class="w-4 h-4 text-muted-foreground" />
          </template>
        </DashboardCardOverview>
        <DashboardCardOverview title="Total Masuk" :value="statsData.totalIn">
          <template #icon>
            <ArrowDownTrayIcon class="w-4 h-4 text-muted-foreground" />
          </template>
        </DashboardCardOverview>
        <DashboardCardOverview title="Total Keluar" :value="statsData.totalOut">
          <template #icon>
            <ArrowUpTrayIcon class="w-4 h-4 text-muted-foreground" />
          </template>
        </DashboardCardOverview>
      </div>
      <div class="grid grid-cols-2 gap-4 mb-4">
        <DashboardChartOverview
          :title="`Chart Bulanan ${currentYear}`"
          chart-id="ChatBulanan"
          :options="chartOptions"
          :data="chartDataBulanan"
        />
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup>
import { ChartPieIcon, ChartBarIcon, ArrowDownTrayIcon, ArrowUpTrayIcon } from '@heroicons/vue/24/solid'
import { ref } from 'vue'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

const { $client } = useNuxtApp()
const { data: statsData } = await $client.stats.getAll.useQuery()

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const COLORS = {
  faceId: {
    background: 'rgba(255, 99, 132, 0.2)',
    border: 'rgba(255, 99, 132, 1)'
  },
  fingerprint: {
    background: 'rgba(54, 162, 235, 0.2)',
    border: 'rgba(54, 162, 235, 1)'
  },
  tapCard: {
    background: 'rgba(255, 206, 86, 0.2)',
    border: 'rgba(255, 206, 86, 1)'
  }
}

const generateChartData = (labels, datasets) => {
  return {
    labels,
    datasets: datasets.map((dataset) => {
      const key = dataset.label

      return {
        ...dataset,
        backgroundColor: COLORS[key].background,
        borderColor: COLORS[key].border,
        borderWidth: 1
      }
    })
  }
}

let chartDataBulanan = ref(null)
let currentYear = ref(null)

if (statsData.value) {
  currentYear = ref(statsData.value.chartsMonthly.currentYear)
  chartDataBulanan = ref(generateChartData(statsData.value.chartsMonthly.listMonthBefore, statsData.value.chartsMonthly.listData ? statsData.value.chartsMonthly.listData : []))
}

const chartOptions = ref({
  responsive: true
})

useHead({
  title: 'Dashboard'
})

definePageMeta({
  middleware: ['auth-logged-in']
})
</script>

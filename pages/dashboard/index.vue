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
      <div class="grid grid-cols-1 gap-4 mb-4 xl:grid-cols-2">
        <DashboardBarChartOverview
          :title="`Chart Bulanan ${currentYear}`"
          chart-id="ChatBulanan"
          :options="chartOptions"
          :data="chartDataBulanan"
        />
        <DashboardPieChartOverview
          :title="`Chart Mingguan ${currentMonth}`"
          chart-id="chartMingguan"
          :options="chartOptions"
          :data="chartDataMingguan"
        />
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup>
import { ChartPieIcon, ChartBarIcon, ArrowDownTrayIcon, ArrowUpTrayIcon } from '@heroicons/vue/24/solid'
import { ref } from 'vue'

const { $client } = useNuxtApp()
const { data: statsData } = await $client.stats.getAll.useQuery()

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

const generateBarChartData = (labels, datasets) => {
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

const generatePieChartData = (labels, datasets) => {
  return {
    labels,
    datasets: [{
      backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
      data: datasets
    }]
  }
}

let chartDataBulanan = ref(null)
let currentYear = ref(null)

const chartDataMingguan = ref(null)
let currentMonth = ref(null)

if (statsData.value) {
  currentYear = ref(statsData.value.chartsMonthly.currentYear)
  chartDataBulanan = ref(generateBarChartData(statsData.value.chartsMonthly.listMonthBefore, statsData.value.chartsMonthly.listData ? statsData.value.chartsMonthly.listData : []))

  currentMonth = ref(statsData.value.chartsWeekly.currentMonth)
  chartDataMingguan.value = ref(generatePieChartData(statsData.value.chartsWeekly.listWeekBefore, statsData.value.chartsWeekly.listData ? statsData.value.chartsWeekly.listData : []))
}

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false
})

useHead({
  title: 'Dashboard'
})

definePageMeta({
  middleware: ['auth-logged-in']
})
</script>

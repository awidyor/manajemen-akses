<template>
  <div>
    <NuxtLayout>
      <h1 class="mb-4 text-2xl font-semibold tracking-tight scroll-m-20">
        Overview
      </h1>
      <div class="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCardOverview title="Total Jabatan" :value="999">
          <template #icon>
            <ChartPieIcon class="w-4 h-4 text-muted-foreground" />
          </template>
        </DashboardCardOverview>
        <DashboardCardOverview title="Total User" :value="999">
          <template #icon>
            <ChartBarIcon class="w-4 h-4 text-muted-foreground" />
          </template>
        </DashboardCardOverview>
        <DashboardCardOverview title="Total Masuk" :value="999">
          <template #icon>
            <ArrowDownTrayIcon class="w-4 h-4 text-muted-foreground" />
          </template>
        </DashboardCardOverview>
        <DashboardCardOverview title="Total Keluar" :value="999">
          <template #icon>
            <ArrowUpTrayIcon class="w-4 h-4 text-muted-foreground" />
          </template>
        </DashboardCardOverview>
      </div>
      <div class="grid grid-cols-2 gap-4 mb-4">
        <DashboardChartOverview
          title="Chart Bulanan"
          chart-id="ChatBulanan"
          :options="chartOptions"
          :data="chartDataBulanan"
        />
        <DashboardChartOverview
          title="Chart Mingguan"
          chart-id="ChatMingguan"
          :options="chartOptions"
          :data="chartDataMingguan"
        />
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { ChartPieIcon, ChartBarIcon, ArrowDownTrayIcon, ArrowUpTrayIcon } from '@heroicons/vue/24/solid'
import { ref } from 'vue'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

/**
 * Calculates the previous 6 months from the current month and returns an array of month names.
 *
 * @returns {string[]} Array of month names.
 */
const monthNow = new Date().getMonth()
const monthBefore = Array.from({ length: 6 }, (_, i) => monthNow - i).reverse()
const listmonthBefore = monthBefore.map((month) => {
  const date = new Date()
  date.setMonth(month)
  return date.toLocaleString('default', { month: 'long' })
})

type ColorKey = 'faceId' | 'fingerprint' | 'tapCard';

interface Color {
  background: string;
  border: string;
}

const COLORS: Record<ColorKey, Color> & Record<string, Color> = {
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

interface Dataset {
  label: string;
  data: number[];
}

const generateChartData = (labels: string[], datasets: Dataset[]) => {
  return {
    labels,
    datasets: datasets.map((dataset) => {
      /**
       * Formats a label by converting it to camel case.
       *
       * @param {string} label - The label to be formatted.
       * @returns {string} The formatted label in camel case.
       */
      function formatLabel (label: string): string {
        return label.split(' ')
          .map((word, index) => index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join('')
      }
      const key = formatLabel(dataset.label)

      return {
        ...dataset,
        backgroundColor: COLORS[key].background,
        borderColor: COLORS[key].border,
        borderWidth: 1
      }
    })
  }
}

const chartDataBulanan = ref(generateChartData(listmonthBefore, [
  { label: 'Face ID', data: [150, 120, 100, 80, 90, 110] },
  { label: 'Fingerprint', data: [80, 90, 110, 130, 140, 160] },
  { label: 'Tap Card', data: [100, 120, 150, 130, 110, 90] }
]))

const chartDataMingguan = ref(generateChartData(['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4'], [
  { label: 'Face ID', data: [150, 120, 100, 80] },
  { label: 'Fingerprint', data: [80, 90, 110, 130] },
  { label: 'Tap Card', data: [100, 120, 150, 130] }
]))

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

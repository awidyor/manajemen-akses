<template>
  <div class="bg-white border shadow rounded-xl text-card-foreground">
    <div class="flex flex-row items-center justify-between p-6 pb-2 space-y-0">
      <h3 class="text-sm font-medium tracking-tight">
        {{ title }}
      </h3>
    </div>
    <div class="p-6 pt-0">
      <Pie
        :id="chartId"
        :options="options"
        :data="data"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Pie } from 'vue-chartjs'
import { type ChartData } from 'chart.js'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const props = defineProps<{
  title: String,
  chartId: String,
  options: Object,
  data: ChartData<'pie'>
}>()

const options = ref(props.options)
const data = ref(props.data)
</script>

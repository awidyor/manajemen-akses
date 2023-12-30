<template>
  <div class="bg-white border shadow rounded-xl text-card-foreground">
    <div class="flex flex-row items-center justify-between p-6 pb-2 space-y-0">
      <h3 class="text-sm font-medium tracking-tight">
        {{ title }}
      </h3>
    </div>
    <div class="p-6 pt-0">
      <Bar
        :id="chartId"
        :options="options"
        :data="data"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Bar } from 'vue-chartjs'
import { type ChartData } from 'chart.js'

const props = defineProps<{
  title: String,
  chartId: String,
  options: Object,
  data: ChartData<'bar'>
}>()

const options = ref(props.options)
const data = ref(props.data)
</script>

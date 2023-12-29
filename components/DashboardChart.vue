<template>
  <div class="rounded-xl border bg-white text-card-foreground shadow">
    <div class="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
      <h3 class="tracking-tight text-sm font-medium">
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

const props = defineProps<{
  title: String,
  chartId: String,
  options: Object,
  data: Object
}>()

const options = ref(props.options)
const data = ref(props.data)
</script>

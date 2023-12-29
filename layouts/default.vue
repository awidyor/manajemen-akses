<template>
  <div>
    <div class="antialiased bg-gray-50 dark:bg-gray-900">
      <TopbarDashboard :name="$auth.user.name" :email="$auth.user.email" />

      <SidebarDashboard />

      <main class="p-4 md:ml-64 h-auto pt-20">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'

// initialize components based on data attribute selectors
onMounted(() => {
  initFlowbite()
})
</script>

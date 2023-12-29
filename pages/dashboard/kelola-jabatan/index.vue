<template>
  <div>
    <NuxtLayout>
      <h1 class="scroll-m-20 text-2xl font-semibold tracking-tight mb-4">
        Kelola Jabatan
      </h1>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Dashboard | Kelola Jabatan'
})

definePageMeta({
  middleware: ['auth-logged-in']
})
</script>

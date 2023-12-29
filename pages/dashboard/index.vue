<template>
  <div>
    <h1>Hello Dashboard</h1>
    <NuxtLink to="/api/logout" external>
      Sign out
    </NuxtLink>
    {{ $auth.user }}
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth-logged-in']
})
</script>

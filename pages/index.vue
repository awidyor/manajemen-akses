<template>
  <div>
    <NuxtLink to="/api/login" external>
      Sign in
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
// will redirect successfully with the 'external' parameter set to 'true'
await navigateTo({
  path: '/api/login'
})
</script>

<template>
  <div class="page">
    <AppNavbar />
    <SectionsFlowField />
    <main class="relative z-10">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppNavbar from '~/components/AppNavbar.vue';
import AppFooter from '~/components/AppFooter.vue';
</script>

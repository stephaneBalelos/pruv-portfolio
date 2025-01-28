<template>
  <div class="page">
    <AppNavbar />
    <main>
      <SectionsFlowField />
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppNavbar from '~/components/AppNavbar.vue';
import AppFooter from '~/components/AppFooter.vue';
</script>

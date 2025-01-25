<template>
  <div>
      <AppNavbar />
      <main>
        <slot />
      </main>
      <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppNavbar from '~/components/AppNavbar.vue';
import AppFooter from '~/components/AppFooter.vue';
import { usePage } from '#pruvious/client'



console.log('Legal layout')

const page = usePage()

console.log(page.value)
</script>

<style scoped>

</style>
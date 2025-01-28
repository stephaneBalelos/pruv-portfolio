<template>
  <header
    class="not-prose backdrop-blur border-b border-gray-200 dark:border-gray-800 fixed w-full top-0 z-50 py-4"
  >
    <UContainer class="flex items-center justify-between">
      <div class="flex items-center gap-1.5">
        <NuxtLink
          :to="'/'"
          :aria-label="'label'"
          class="flex-shrink-0 font-bold text-xl text-gray-900 dark:text-white flex items-end gap-1.5"
        >
          Stephane Dondyas
        </NuxtLink>
      </div>
      <div class="">
        <UButton
          
          color="primary"
          variant="soft"
          square
          :to="'/projects'"
        >
      {{ _("projects") }}
      </UButton>
      </div>
    </UContainer>
  </header>
</template>

<script setup lang="ts">
import { _ } from "~/.pruvious/client";

</script>

<style scoped></style>

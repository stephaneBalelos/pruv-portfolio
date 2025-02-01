<script setup lang="ts">
import { useLanguage } from "~/.pruvious/client";

const language = useLanguage();

const { setLocale } = useI18n();

if (language.value) {
  setLocale(language.value);
}
</script>

<template>
  <div class="prose prose-slate dark:prose-invert max-w-none">
    <NuxtPage />
  </div>
  <ClientOnly>
    <ExternalPlausibleScript />
  </ClientOnly>
</template>

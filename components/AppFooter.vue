<template>
  <footer
    class="backdrop-blur border-t border-gray-200 dark:border-gray-800 py-6 not-prose"
  >
    <UContainer class="flex flex-col lg:flex-row gap-6 justify-between">
      <div class="flex flex-col items-center gap-2">
        <div class="flex items-center gap-2">
          <UButton
          v-if="language"
          icon="i-heroicons-globe-europe-africa"
          size="sm"
          block
          color="primary"
          variant="link"
          @click="toggleLanguage(language == 'de' ? 'en' : 'de')"
        >
          {{ language == 'de' ? 'English' : 'Deutsch' }} 
        </UButton>
        </div>
        <ClientOnly>
          <UButton
            size="sm"
            color="primary"
            block
            variant="link"
            :label="
              colorMode.preference === 'dark' ? _('light_mode') : _('dark_mode')
            "
            :icon="
              colorMode.preference === 'dark'
                ? 'i-heroicons-moon'
                : 'i-heroicons-sun'
            "
            @click="toggleColorMode"
          />
        </ClientOnly>
        <UButton
          icon="i-heroicons-cog"
          size="sm"
          block
          color="primary"
          variant="link"
          :label="_('cookies')"
          :trailing="true"
        />
      </div>
      <div class="flex flex-col">
        <div class="mb-2">{{ _('projects') }}</div>
        <UButton
          size="sm"
          color="primary"
          variant="link"
          label="Saunahuus Relaunch"
          class="px-0"
          :to="'/projects'"
        />
        <UButton
          size="sm"
          color="primary"
          variant="link"
          label="Karjolen App"
          class="px-0"
          :to="'/projects'"
        />
      </div>

      <div class="flex flex-col">
        <div class="mb-2">{{ _('legal') }}</div>
        <UButton
          size="sm"
          color="primary"
          variant="link"
          :label="_('privacy_policy')"
          class="px-0"
          :to="'/legal/privacy-policy'"
        />
        <UButton
          size="sm"
          color="primary"
          variant="link"
          :label="_('imprint')"
          class="px-0"
          :to="'/legal/imprint'"
        />
      </div>
    </UContainer>
  </footer>
</template>

<script setup lang="ts">
import { usePage, useLanguage, _ } from "#pruvious/client";

const language = useLanguage();

const page = usePage();
const colorMode = useColorMode();

console.log(page.value);

function toggleColorMode() {
  colorMode.preference = colorMode.preference === "dark" ? "light" : "dark";
}

function toggleLanguage(code: 'de' | 'en') {
  if (page.value) {
    const path = page.value.translations[code];
    navigateTo(path)
  }
}
</script>

<style scoped></style>

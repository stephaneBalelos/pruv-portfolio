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
              colorMode.preference === 'dark' ? $t('light_mode') : $t('dark_mode')
            "
            :icon="
              colorMode.preference === 'dark'
                ? 'i-heroicons-moon'
                : 'i-heroicons-sun'
            "
            @click="toggleColorMode"
          />
        </ClientOnly>
        <!-- <UButton
          icon="i-heroicons-cog"
          size="sm"
          block
          color="primary"
          variant="link"
          :label="$t('cookies')"
        /> -->
      </div>
      <div class="flex flex-col">
        <div class="mb-2">{{ $t('projects') }}</div>
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
        <div class="mb-2">{{ $t('legal') }}</div>
        <UButton
          size="sm"
          color="primary"
          variant="link"
          :label="$t('privacy_policy')"
          class="px-0"
          :to="`${language === 'de' ? '' : '/en'}/legal/datenschutz`"
        />
        <UButton
          size="sm"
          color="primary"
          variant="link"
          :label="$t('imprint')"
          class="px-0"
          :to="`${language === 'de' ? '' : '/en'}/legal/impressum`"
        />
      </div>
    </UContainer>
  </footer>
</template>

<script setup lang="ts">
import { usePage, useLanguage } from "#pruvious/client";

const language = useLanguage();

const { setLocale } = useI18n();

const page = usePage();
const colorMode = useColorMode();

function toggleColorMode() {
  colorMode.preference = colorMode.preference === "dark" ? "light" : "dark";
}

function toggleLanguage(code: 'de' | 'en') {
  if (page.value) {
    setLocale(code);
    console.log(page.value.translations[code]);
    const path = page.value.translations[code];
    if (path) {
      navigateTo(path)
    }

  }
}

</script>

<style scoped></style>

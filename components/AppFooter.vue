<template>
  <footer
    class="backdrop-blur border-t border-gray-200 dark:border-gray-800 py-6 not-prose"
  >
    <UContainer class="flex flex-col lg:flex-row gap-6 justify-between">
      <div class="flex flex-col items-center gap-2">
        <UButton
          size="sm"
          color="primary"
          block
          variant="solid"
          :label="colorMode.preference === 'dark' ? 'Light Mode' : 'Dark Mode'"
          :icon="colorMode.preference === 'dark' ? 'i-heroicons-moon' : 'i-heroicons-sun'"
          @click="toggleColorMode"
        />
        <UButton
          icon="i-heroicons-cog"
          size="sm"
          block
          color="primary"
          variant="link"
          label="Cookies"
          :trailing="true"
        />
      </div>
      <div class="flex flex-col">
        <div class="mb-2">Projects</div>
        <UButton
          size="sm"
          color="primary"
          variant="link"
          label="Saunahuus Relaunch"
          class="px-0"
          
        />
        <UButton
          size="sm"
          color="primary"
          variant="link"
          label="Karjolen App"
          class="px-0"
        />
      </div>

      <div class="flex flex-col">
        <div class="mb-2">Legal</div>
        <UButton
          size="sm"
          color="primary"
          variant="link"
          label="Privacy Policy"
          class="px-0"
          :to="'/legal/privacy-policy'"
        />
        <UButton
          size="sm"
          color="primary"
          variant="link"
          label="Impressum"
          class="px-0"
          :to="'/legal/imprint'"
        />
      </div>
    </UContainer>
  </footer>
</template>

<script setup lang="ts">
const colorMode = useColorMode();

function toggleColorMode() {
  colorMode.preference = colorMode.preference === "dark" ? "light" : "dark";
}
</script>

<style scoped></style>

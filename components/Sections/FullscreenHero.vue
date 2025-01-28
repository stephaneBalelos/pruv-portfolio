<template>
  <div class="relative flex items-center justify-center h-screen w-full">
    <UContainer>
        <div class="flex flex-col text-center">
          <div
            class="text-sm text-gray-800 dark:text-gray-200 font-semibold uppercase mb-2"
          >
            <TextSchuffle>
              {{ props.subtitle }}
            </TextSchuffle>
          </div>
          <div class="text-4xl text-gray-900 dark:text-gray-100">
            <TextSchuffle :interval="30">
              {{ props.title }}
            </TextSchuffle>
          </div>
          <div class="text-sm text-gray-800 dark:text-gray-200">
            {{ props.description }}
          </div>
        </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import TextSchuffle from "../ui/TextSchuffle.vue";

type Props = {
  title: string;
  description?: string;
  subtitle?: string;
  image?: string;
};

const props = defineProps<Props>();
</script>

<style scoped></style>

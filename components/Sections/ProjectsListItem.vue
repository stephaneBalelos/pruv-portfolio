<template>
  <div ref="section" class="relative flex items-center justify-center min-h-screen w-full pt-24">
    <UContainer class="h-full">
      <div class="relative">
        <div class="lg:w-9/12 lg:ml-auto lg:h-full">
          <img
          ref="image"
            :src="props.imageUrl"
            :alt="props.title"
            class="w-full h-full object-cover m-0"
          >
        </div>
        <div
        ref="projectCard"
          class="w-full lg:w-3/4 bottom-8 lg:bottom-24 left-0 flex flex-col bg-white dark:bg-gray-800 p-8 shadow-lg"
        >
          <div class="text-sm text-primary-900 dark:text-primary-200">{{ props.label }}</div>
          <div class="text-xl lg:text-4xl font-bold text-gray-900 dark:text-gray-200">
            {{ props.title }}
          </div>
          <div class="text-sm text-gray-900 dark:text-gray-200 mt-4">
            <PruviousHTML :html="props.description" />
          </div>
          <div v-if="props.links" class="mt-4 flex flex-wrap gap-2 not-prose">
            <UButton
              v-for="l, index in props.links"
              :key="index"
              class="px-0 lg:px-4"
              color="primary"
              variant="ghost"
              :label="l.label"
              icon="i-heroicons-arrow-up-right-20-solid"
              :to="l.url"
              target="_blank"
              trailing
            />

          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import { PruviousHTML } from "#components";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Props = {
  label?: string;
  title: string;
  description: string;
  imageUrl?: string;
  links?: {
    label: string;
    url: string;
  }[]
};

const props = defineProps<Props>();

const section = ref<HTMLElement | null>(null);
const image = ref<HTMLElement | null>(null);
const projectCard = ref<HTMLElement | null>(null);

onMounted(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (projectCard.value && section.value && image.value) {
        const tl = gsap.timeline({
            scrollTrigger: {
            trigger: section.value,
            start: "top top",
            end: "center top",
            scrub: 3,
            toggleActions: "play pause resume reset",
            },
        });
    
        tl.to(projectCard.value, {
            y: -200,
            duration: 1,
        });

        tl.to(image.value, {
            opacity: .2,
            duration: 1,
        }, "-=1");
    }
})

</script>

<style scoped></style>

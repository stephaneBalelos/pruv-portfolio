<template>
  <UContainer>
    <div ref="section" class="relative flex-col lg:flex-row items-center justify-between gap-24">
      <div class="flex flex-col flex-1">
        <h2
          ref="text"
          class="bg-animated-text text-4xl font-bold text-gray-900 dark:text-gray-100"
        >
          {{ props.title }}
        </h2>
      </div>
      <div class="flex flex-2">
        <img :src="props.image" alt="" >
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


type Props = {
  title: string;
  subtitle?: string;
  image?: string;
};

const props = defineProps<Props>();

const section = ref<HTMLDivElement | null>(null);
const text = ref<HTMLHeadingElement | null>(null);

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  if (text.value && text.value.textContent && section.value) {
    text.value.innerHTML = text.value.textContent.replace(
      /\S/g,
      "<span class='letter'>$&</span>"
    );

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section.value,
        start: "top 80%",
        end: "bottom 80%",
        scrub: 3,
        toggleActions: "play pause resume reset",
      },
    });

    tl.to(text.value.querySelectorAll('.letter'), {
      backgroundPosition: '0% 0%', ease: 'expo.out', stagger: .5,
    })
  }
});
</script>

<style lang="scss" scoped>

</style>

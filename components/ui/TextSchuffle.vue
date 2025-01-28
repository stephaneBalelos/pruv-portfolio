<template>
  <div ref="textEl">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useInterval } from "@vueuse/core";

type Props = {
  maxIterations?: number;
  interval?: number;
};

const props = defineProps<Props>()

const characters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '!', '@', '#', '$', '%', '^', '&', '*', '-', '_', '+', '=', ';', ':', '<', '>', ','].join('');

const textEl = ref<HTMLElement | null>(null);
const originalText = ref<string>("");
const charsElements = ref<HTMLElement[]>([]);

const { counter, pause, resume } = useInterval(props.interval ?? 200, {
  controls: true,
  immediate: false,
});

const maxIterations = ref(props.maxIterations ?? 0);

const state = reactive({
  iterations: 0,
  currentRange: [0, 1],
  groupSize: 1,
});

onMounted(() => {
  if (textEl.value) {
    originalText.value = textEl.value.textContent || "";
    if (!originalText.value) return;

    if (!maxIterations.value) {
        maxIterations.value = originalText.value.length;
    }
    textEl.value.innerHTML = "";

    state.groupSize = maxIterations.value ? Math.ceil(
      originalText.value.length / (maxIterations.value)
    ): 1;

    state.currentRange = [0, state.groupSize];


    textEl.value.innerHTML = originalText.value.replace(
      /.?/g,
      "<span class='letter'>$&</span>"
    );
    charsElements.value = Array.from(textEl.value.querySelectorAll(".letter"));
    resume();
  }
});

function shuffleCharacters() {
  for (let i = 0; i < charsElements.value.length; i++) {
    if (i <= state.iterations * state.groupSize || originalText.value.charAt(i) === " ") {
      charsElements.value[i].textContent = originalText.value.charAt(i);
    } else {
      charsElements.value[i].textContent = randowChar();
    }
  }
}

const randowChar = () => {
  return characters.charAt(Math.floor(Math.random() * characters.length));
};

watch(counter, () => {
    state.iterations = counter.value;
  if (counter.value >= maxIterations.value) {
    textEl.value!.textContent = originalText.value!;
    pause();
    return;
  }
  shuffleCharacters();
});
</script>

<style scoped></style>

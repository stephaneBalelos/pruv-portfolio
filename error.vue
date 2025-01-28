<script setup lang="ts">
import type { NuxtError } from '#app'
import TextSchuffle from './components/ui/TextSchuffle.vue'


const props = defineProps({
  // eslint-disable-next-line vue/require-default-prop
  error: Object as () => NuxtError
})

onMounted(() => {
  console.error(props.error)
})

function goBack() {
  navigateTo('/')
}
</script>

<template>
    <div class="absolute inset-0 flex items-center justify-center">
      <UContainer>
        <div v-if="props.error" class="mb-4"> {{ props.error.statusCode }}</div>
          <TextSchuffle v-if="props.error && props.error.statusCode === 404" :interval="50" class="text-4xl">
            How you got here is a mystery, but there's always a way back home.
          </TextSchuffle>
            <TextSchuffle v-else :interval="50" class="text-4xl">
                For god's sake, stop breaking my website!
            </TextSchuffle>
          <button class="font-bold button mt-8" @click="goBack">Back home</button>
      </UContainer>
    </div>
</template>

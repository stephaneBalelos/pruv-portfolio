<template>
    <FullScreenHero :title="props.title ?? ''" :subtitle="subtitle" :image="image?.src" />
</template>

<script setup lang="ts">
import { defineBlock, imageField, textField, } from '~/.pruvious'
import FullScreenHero from '~/components/Sections/FullscreenHero.vue'

defineBlock({
  label: "Full Screen Header",
  description: "Full screen header block",
  icon: "Wallpaper",
});

const props = defineProps({
  title: textField({ label: "Title", default: "Title", required: true }),
  subtitle: textField({ label: "Subtitle", default: "Subtitle" }),
  image: imageField({ label: "Image" }),
})


</script>

<style scoped>

</style>
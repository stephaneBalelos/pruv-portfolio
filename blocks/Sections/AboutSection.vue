<template>
 <AboutSection :title="props.title ?? ''" :image="props.image?.src" />
</template>

<script setup lang="ts">
import { defineBlock, imageField, textField, } from '~/.pruvious'
import AboutSection from '~/components/Sections/AboutSection.vue'

defineBlock({
  label: "About Section",
  description: "About section block",
  icon: "Wallpaper",
});

const props = defineProps({
  title: textField({ label: "Title", default: "Title", required: true }),
  image: imageField({ label: "Image" }),
})
</script>

<style scoped>

</style>
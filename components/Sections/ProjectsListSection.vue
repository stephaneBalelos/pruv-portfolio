<template>
  <div>
    <ProjectsListItem
      v-for="(project, index) in data"
      :key="index"
      :label="$t('projects')"
      :title="project.title"
      :description="project.description"
      :image-url="project.image?.src"
    />
  </div>
</template>

<script setup lang="ts">
import ProjectsListItem from "./ProjectsListItem.vue";
import { useLanguage } from '#pruvious/client'

const language = useLanguage()


const { data } = await useAsyncData(async () => {
  const response = await $fetch("/api/projects", {
    headers: {
      'Accept-Language': language.value as string
    }
  });

  console.log(response);

  return response;
});
</script>

<style scoped></style>

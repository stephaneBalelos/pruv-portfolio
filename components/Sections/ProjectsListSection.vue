<template>
  <div>
    <ProjectsListItem
      v-for="(project, index) in data"
      :key="index"
      :label="_('projects')"
      :title="project.title"
      :description="project.description"
      :image-url="'dasdsa'"
      :upload-id="project.image?.uploadId"
    />
  </div>
</template>

<script setup lang="ts">
import ProjectsListItem from "./ProjectsListItem.vue";
import { _ } from "#pruvious/client";


const { data } = await useAsyncData("projects", async () => {
  const response = await $fetch("/api/projects");

  return response;
});
</script>

<style scoped></style>

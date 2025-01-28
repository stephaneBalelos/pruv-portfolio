<template>
  <div>
    <ProjectsListItem
      v-for="(project, index) in data"
      :key="index"
      :title="project.title"
      :description="project.description"
      :image-url="'dasdsa'"
      :upload-id="project.image?.uploadId"
    />
  </div>
</template>

<script setup lang="ts">
import ProjectsListItem from "./ProjectsListItem.vue";


const { data } = await useAsyncData("projects", async () => {
  const response = await $fetch("/api/projects");

  console.log(response);
  return response;
});
</script>

<style scoped></style>

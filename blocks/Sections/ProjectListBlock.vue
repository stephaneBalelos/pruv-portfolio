<template>
    <ProjectListSection />
</template>

<script setup lang="ts">
import { defineBlock } from '~/.pruvious';
import ProjectListSection from '~/components/Sections/ProjectsListSection.vue'

defineBlock({
    label: "Project List Section",
    description: "Project list section block",
    icon: "Wallpaper",
});


</script>

<style scoped>

</style>
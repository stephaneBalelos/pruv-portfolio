<template>
  <CurriculumSection :title="props.title ?? ''">
    <template #html>
      <PruviousHTML :html="props.textContent" />
    </template>
  </CurriculumSection>
</template>

<script setup lang="ts">
import CurriculumSection from "~/components/Sections/CurriculumSection.vue";
import { defineBlock, editorField, textField } from "~/.pruvious";

defineBlock({
    label: "Curriculum Section",
    description: "Curriculum section block",
    icon: "Wallpaper",
});

const props = defineProps({
    title: textField({ label: "Title", default: "Title", required: true }),
    textContent: editorField({
        label: "Text Content",
        placeholder: "Enter your text here",
        blockFormats: [
        { className: "p-6 border rounded", label: "Boxed", tags: ["div"] },
        ],
        inlineFormats: [{ className: "text-red-500", label: "Red" }],
        toolbar: [
        "bold",
        "italic",
        "heading2",
        "heading3",
        "paragraph",
        "link",
        "blockFormats",
        "inlineFormats",
        "clear",
        ],
        required: true,
    }),
});
</script>

<style scoped></style>

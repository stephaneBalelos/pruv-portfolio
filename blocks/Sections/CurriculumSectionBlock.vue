<template>
  <CurriculumSection :title="props.title ?? ''" :items="items">
    <template #html>
      <PruviousHTML :html="props.textContent" />
    </template>
  </CurriculumSection>
</template>

<script setup lang="ts">
import CurriculumSection from "~/components/Sections/CurriculumSection.vue";
import { defineBlock, editorField, repeaterField, textAreaField, textField } from "~/.pruvious";

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
    items: repeaterField({
    subfields: {
      title: textField({ label: "Title", default: "Title", required: true }),
        description: textAreaField({ label: "Description", default: "Description" }),
    },
    addLabel: 'Add a Curriculum Item',
  })
});
</script>

<style scoped></style>

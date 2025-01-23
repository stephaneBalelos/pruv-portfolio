<template>
  <FormsContactForm :title="props.title ?? ''" />
</template>

<script setup lang="ts">

import { defineBlock, textField } from "~/.pruvious";

defineBlock({
  label: "Contact Form",
  description: "Contact form block",
  icon: "Mail",
});

const props = defineProps({
  title: textField({ label: "Title", default: "Title", required: true }),
});

</script>

<style scoped></style>

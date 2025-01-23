<template>
  <UContainer>
      <div class="flex flex-col">
        <h2 class="text-2xl font-bold">{{ props.title }}</h2>
        <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
          <UFormGroup label="What's your name" name="name">
            <UInput v-model="state.name" />
          </UFormGroup>
          <UFormGroup label="How can I reach you" name="email">
            <UInput v-model="state.email" />
          </UFormGroup>
          <UFormGroup label="How can I help you?" name="message">
            <UTextarea v-model="state.message" />
          </UFormGroup>
          <div class="flex justify-center pt-8">
            <UButton type="submit"> Connect </UButton>
          </div>
        </UForm>
      </div>
  </UContainer>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";
import { z } from "zod";
import { defineBlock, textField } from "~/.pruvious";

defineBlock({
  label: "Contact Form",
  description: "Contact form block",
  icon: "Mail",
});

const props = defineProps({
  title: textField({ label: "Title", default: "Title", required: true }),
});

const schema = z.object({
  name: z.string().nonempty(),
  email: z.string().email(),
  message: z.string().nonempty(),
});

type Schema = z.infer<typeof schema>;

const state = reactive({
  name: "",
  email: "",
  message: "",
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with data
  console.log(event.data);
}
</script>

<style scoped></style>

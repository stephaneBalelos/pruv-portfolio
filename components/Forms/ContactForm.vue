<template>
  <UContainer>
      <div class="flex flex-col lg:flex-row gap-8 items-center justify-between">
          <div class="flex flex-col w-full">
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
              <div class="flex justify-center py-8">
                <UButton type="submit"> Connect </UButton>
              </div>
            </UForm>
          </div>
          <div class="w-full flex flex-col items-end gap-2">  
            <UButton color="gray" variant="link">Button</UButton>
            <UButton color="gray" variant="link">Button</UButton>
            <UButton color="gray" variant="link">Button</UButton>
          </div>
      </div>
  </UContainer>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";
import { z } from "zod";

type Props = {
  title: string;
};

const props = defineProps<Props>();

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

<style scoped>

</style>
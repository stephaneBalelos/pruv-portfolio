<template>
  <UContainer>
      <div class="flex flex-col lg:flex-row gap-8 items-center justify-between mb-16">
          <div class="flex flex-col w-full">
            <h2 class="text-2xl font-bold">{{ props.title }}</h2>
            <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
              <UFormGroup :label="t('form.name')" name="name">
                <UInput v-model="state.name" />
              </UFormGroup>
              <UFormGroup :label="t('form.email')" name="email">
                <UInput v-model="state.email" />
              </UFormGroup>
              <UFormGroup :label="t('form.message')" name="message">
                <UTextarea v-model="state.message" />
              </UFormGroup>
              <NuxtTurnstile ref="turnstile" v-model="state.token" :appearance="'interaction-only'" :options="{ action: 'vue', language: language ?? undefined }"/>
              <div class="flex justify-center py-8">
                <UButton v-if="state.token" type="submit"> {{ t('form.submit') }} </UButton>
              </div>
            </UForm>
          </div>
          <div class="w-full flex flex-col items-center lg:items-end gap-2">  
            <UButton color="gray" variant="link" icon="i-heroicons-envelope">
              hello@stephanedondyas.dev

            </UButton>
            <UButton color="gray" variant="link" icon="i-bxl-github">
              @stephaneBalelos
            </UButton>
          </div>
      </div>
  </UContainer>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";
import { z } from "zod";
import { useLanguage } from "~/.pruvious/client";

type Props = {
  title: string;
};

const props = defineProps<Props>();

const language = useLanguage();
const { t } = useI18n({
  useScope: 'local'
});

const schema = z.object({
  name: z.string().nonempty(),
  email: z.string().email(),
  message: z.string().nonempty(),
  token: z.string().nonempty(),
});

type Schema = z.infer<typeof schema>;

const state = reactive({
  name: "",
  email: "",
  message: "",
  token: "",
});

const turnstile = ref();

async function onSubmit($event: FormSubmitEvent<Schema>) {
  console.log($event.data);
    const response = await $fetch('/api/contact-requests', {
    method: 'post',
    body: {
        name: $event.data.name,
        email: $event.data.email,
        message: $event.data.message,
        token: $event.data.token,
    }
  })

  console.log(response)
  if (response) {
    alert('Thank you for reaching out. I will get back to you soon.')
  } else {
    alert('Something went wrong. Please try again later.')
  }
}
</script>

<style scoped>

</style>

<i18n lang="json">
{
  "de": {
    "form": {
      "name": "Wie ist Ihr Name?",
      "email": "Wie kann ich Sie erreichen?",
      "message": "Wie kann ich Ihnen helfen?",
      "submit": "Absenden"
    }
  },
  "en": {
    "form": {
      "name": "What's your name?",
      "email": "How can I reach you?",
      "message": "How can I help you?",
      "submit": "Connect"
    }
  }
}
</i18n>
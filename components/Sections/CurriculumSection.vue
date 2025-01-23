<template>
    <UContainer>
        <div class="relative flex flex-col items-center justify-between gap-24">
            <div class="flex flex-col flex-1">
                <h2 class="text-4xl font-bold text-gray-900 dark:text-gray-100">{{ props.title }}</h2>
                <slot name="html" />
            </div>
            <div v-if="items" class="flex flex-col">
                <div v-for="item, index in items" :key="index" class="">
                    <h4>{{ item.title }}</h4>
                    <p>{{ item.description }}</p>
                </div>
            </div>
        </div>
    </UContainer>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';


type Props = {
    title: string
    items?: { title: PropType<string>, description: PropType<string> }[]
    image?: string
}

const props = defineProps<Props>()
</script>

<style scoped>

</style>
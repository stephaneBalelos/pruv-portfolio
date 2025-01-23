<template>
<div class="relative flex items-center justify-center h-screen w-full">
    <div class="flex flex-col text-center ">
        <div class="text-sm text-gray-800 dark:text-gray-200 font-semibold uppercase mb-2">{{ props.subtitle }}</div>
        <div class="text-4xl font-bold text-gray-900 dark:text-gray-100">{{ props.title }}</div>
        <div class="text-sm text-gray-800 dark:text-gray-200">{{ props.description }}</div>
    </div>
</div>
</template>

<script setup lang="ts">

type Props = {
    title: string
    description?: string
    subtitle?: string
    image?: string
}

const props = defineProps<Props>()
</script>

<style scoped>

</style>
<template>
    <UContainer>
        <div class="relative flex items-center justify-between gap-24">
            <div class="flex flex-col flex-1">
                <h2 class="text-4xl font-bold text-gray-900 dark:text-gray-100">{{ props.title }}</h2>
                <slot name="html" />
            </div>
        </div>
    </UContainer>
</template>

<script setup lang="ts">

type Props = {
    title: string
    image?: string
}

const props = defineProps<Props>()
</script>

<style scoped>

</style>
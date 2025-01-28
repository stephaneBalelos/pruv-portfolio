<template>
    <UContainer>
        <div class="relative flex items-center justify-between gap-24">
            <div class="flex flex-col flex-1">
                <h2 class="text-5xl font-bold text-gray-900 dark:text-gray-100">{{ props.title }}</h2>
            </div>
            <div class="flex flex-2">
                <img :src="props.image" alt="">
            </div>
        </div>
    </UContainer>
</template>

<script setup lang="ts">

type Props = {
    title: string
    subtitle?: string
    image?: string
}

const props = defineProps<Props>()

</script>

<style scoped>

</style>
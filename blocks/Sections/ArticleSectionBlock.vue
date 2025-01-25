<template>
    <UContainer >
        <div class="relative flex items-center justify-between py-8">
            <div class="flex flex-col flex-1">
                <h2 class="text-4xl font-bold text-gray-900 dark:text-gray-100">{{ page?.fields.title }}</h2>
            </div>
        </div>
        <div class="relative">
            <PruviousHTML :html="page?.fields.content" />
        </div>
    </UContainer>
</template>

<script setup lang="ts">
import { defineBlock } from '~/.pruvious';
import { usePage } from '~/.pruvious/client';


defineBlock({
    label: 'Article Section',
    description: 'Article section block',
    icon: 'Article',
});

const page = usePage()


</script>

<style scoped>

</style>
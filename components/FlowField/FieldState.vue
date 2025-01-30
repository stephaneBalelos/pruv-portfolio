<script setup lang="ts">

const { updateFlowfield } = useFlowfield();
const { onBeforeRender } = useLoop();

onBeforeRender(() => {
    updateFlowfield();
})
</script>

<template>
    <TresGroup />
</template>

<style scoped>

</style>
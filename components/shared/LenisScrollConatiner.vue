<template>
    <div ref="lenis">
        <slot />
    </div>
</template>

<script setup lang="ts">
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';


const { progress, scroll, velocity } = useLenisScroll()

const lenis = ref<HTMLDivElement | null>(null)
const instance = ref()

const onScroll = (e: Lenis) => {
    instance.value = e
    progress.value = e.progress as number
    scroll.value = e.scroll as number
    velocity.value = e.velocity as number
    ScrollTrigger.update()
}

onMounted(() => {
    instance.value = new Lenis({
        duration: 1.5
    })
    instance.value.on('scroll', onScroll)
    gsap.ticker.add((time) => {
        instance.value.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)
})

onUnmounted(() => {
    instance.value.destroy()
})


</script>

<style scoped></style>
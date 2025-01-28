import { createGlobalState } from '@vueuse/core'

export const useLenisScroll = createGlobalState(() => {
    const progress = ref(0)
    const scroll = ref(0)
    const velocity = ref(0)

    return { progress, scroll, velocity }
})
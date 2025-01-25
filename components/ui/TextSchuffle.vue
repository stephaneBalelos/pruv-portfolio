<template>
    <div ref="textEl">
        <slot />
    </div>
</template>

<script setup lang="ts">
import { useInterval } from '@vueuse/core'


const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}|:"<>?';

const textEl = ref<HTMLElement | null>(null);
const charsElements = ref<HTMLElement[]>([]);

const { counter, reset, pause, resume } = useInterval(200, { controls: true })

onMounted(() => {
    if (textEl.value) {
        const text = textEl.value.textContent;
        textEl.value.innerHTML = '';
        if (!text) return;
        for (let i = 0; i < text.length; i++) {
            const span = document.createElement('span');
            span.textContent = text[i];
            span.style.display = 'inline-block';
            span.style.transition = 'transform 0.3s';

            charsElements.value.push(span);
            textEl.value.appendChild(span);
        }

        shuffleCharacters();
    }
})

function shuffleCharacters() {
    if (textEl.value) {
        charsElements.value.forEach((el) => {
            el.style.transform = `rotate(${Math.random() * 40 - 20}deg)`;
            el.style.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
            el.textContent = randowChar();
        })
    }
}

const randowChar = () => {
    return characters.charAt(Math.floor(Math.random() * characters.length));
}

watch(counter, () => {
    // shuffleCharacters();
})
</script>

<style scoped>

</style>
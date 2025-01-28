<template>
  <TresCanvas window-size>
    <TresPerspectiveCamera
      :position="[0, 0, cameraZ]"
      :fov="60"
      :aspect="width / height"
      :look-at="[0, 0, 0]"
      :near="0.1"
        :far="1000"
    />
    <OrbitControls />

    <!-- <TresMesh>
      <TresPlaneGeometry
        :args="[width, height]"
        :position="[0, 0, 0]"
      />
      <TresMeshBasicMaterial color="orange" />
    </TresMesh> -->

    <!-- <TresGroup>
      <TresMesh
        v-for="(vector, index) in state.flowfield"
        :key="index"
        :position="[vector.position.x + state.cols / 2, vector.position.y + state.cols / 2, vector.position.z]"
      >
        <TresBoxGeometry :args="[10, 10, 10]" />
        <Line2
          :points="[
            0,
            0,
            0,
            vector.direction.x * 10,
            vector.direction.y * 10,
            vector.direction.z,
          ]"
          :line-width="1"
          color="#82dbc5"
        />
        <TresMeshBasicMaterial :color="state.activeIndex == index ? 'red' : 'teal'" />
      </TresMesh>
    </TresGroup> -->

    <TresGroup>
        <FlowfieldParticle v-for="(vector, index) in state.particlesCount" :key="index" />
    </TresGroup>

    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>

<script setup lang="ts">
import { TresCanvas } from "@tresjs/core";
import { useFlowfield } from "~/composables/useFlowfield";
import FlowfieldParticle from '~/components/FlowField/FlowfieldParticle.vue';
import { useWindowSize } from '@vueuse/core';
import { _scale } from "#tailwind-config/theme";

const { state, initFlowfield } = useFlowfield();

const { width, height } = useWindowSize();

onMounted(() => {
  initFlowfield(width.value, height.value);
});

const cameraZ = computed(() => {
    return (Math.max(width.value, height.value) / 2) / (2 * Math.tan(Math.PI / 6)) ;
})

watch([width, height], () => {
  initFlowfield(width.value, height.value);
});

</script>

<style scoped></style>

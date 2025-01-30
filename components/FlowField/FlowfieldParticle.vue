<template>
  <TresGroup v-for="(positions, index) in lastPositions" :key="index">
    <CatmullRomCurve3
      v-if="positions.length > 3"
      ref="particleRefs"
      :key="index"
      :points="positions.map((pos) => new Vector3(pos.x, pos.y, pos.z))"
      :segments="98"
      :line-width=".5"
      :world-units="true"
      color="#cade9c"
    />
  </TresGroup>
</template>

<script setup lang="ts">
import { shallowRef } from "vue";
import { useFlowfield } from "~/composables/useFlowfield";
import { Vector3 } from "three";
import { useInterval, useWindowSize } from "@vueuse/core";

const particleRefs = shallowRef([]);

const { state } = useFlowfield();

const { onBeforeRender } = useLoop();
const { width, height } = useWindowSize();

const { counter, resume } = useInterval(100, {
  controls: true,
  immediate: false,
});

const MaxSpeed = 4;

const position = ref({
  x: getRanNum((-state.cols * state.scale) / 2, (state.cols * state.scale) / 2),
  y: getRanNum((-state.rows * state.scale) / 2, (state.rows * state.scale) / 2),
  z: 0,
});

const velocity = ref({
  x: 0,
  y: 0,
  z: 0,
});
const acceleration = ref({
  x: 0,
  y: 0,
  z: 0,
});

const lastPositions = ref<
  {
    x: number;
    y: number;
    z: number;
  }[][]
>([[]]);

watch(
  () => counter.value,
  () => {
    // updateLastPositions();
  }
);

onMounted(() => {
  position.value = {
    x: getRanNum(
      (-state.cols * state.scale) / 2,
      (state.cols * state.scale) / 2
    ),
    y: getRanNum(
      (-state.rows * state.scale) / 2,
      (state.rows * state.scale) / 2
    ),
    z: 0,
  };

  resume();
});

onBeforeRender(() => {
  if (particleRefs.value) {
    const force = new Vector3(0, 0, 0);

    const x = mapRange(
      position.value.x,
      -width.value / 2,
      width.value / 2,
      0,
      width.value
    );
    const y = mapRange(
      position.value.y,
      -height.value / 2,
      height.value / 2,
      0,
      height.value
    );

    const index =
      Math.floor(x / state.scale) + Math.floor(y / state.scale) * state.cols;

    const vector = state.flowfield[index];

    if (vector) {
      force.x = vector.direction.x;
      force.y = vector.direction.y;
    }

    // Apply force
    acceleration.value.x += force.x;
    acceleration.value.y += force.y;

    // Update velocity
    velocity.value.x += acceleration.value.x;
    velocity.value.y += acceleration.value.y;

    // Limit velocity to MaxSpeed and preserve direction
    const speed = Math.sqrt(
      velocity.value.x * velocity.value.x + velocity.value.y * velocity.value.y
    );
    if (speed > MaxSpeed) {
      velocity.value.x = (velocity.value.x / speed) * MaxSpeed;
      velocity.value.y = (velocity.value.y / speed) * MaxSpeed;
    }

    // Update position
    position.value.x += velocity.value.x;
    position.value.y += velocity.value.y;
    position.value.z += velocity.value.z;

    // Update particle position
    updateLastPositions();

    // Reset acceleration
    acceleration.value.x = 0;
    acceleration.value.y = 0;

    chechEdges();
  }
});

function chechEdges() {
  if (position.value) {
    if (position.value.x > (state.cols * state.scale) / 2) {
      position.value.x = -((state.cols * state.scale) / 2);
      updateLastPositions(true);
    } else if (position.value.x < -((state.cols * state.scale) / 2)) {
      position.value.x = (state.cols * state.scale) / 2;
      updateLastPositions(true);
    }

    if (position.value.y > (state.rows * state.scale) / 2) {
      position.value.y = -((state.rows * state.scale) / 2);
      updateLastPositions(true);
    } else if (position.value.y < -((state.rows * state.scale) / 2)) {
      position.value.y = (state.rows * state.scale) / 2;
      updateLastPositions(true);
    }
  }
}

function updateLastPositions(skip = false) {
  // skip create a new curve if the particle reached the edge
  if (position.value) {
    if (skip) {
      lastPositions.value.push([
        {
          x: position.value.x,
          y: position.value.y,
          z: position.value.z,
        },
      ]);
    }
    if (lastPositions.value.length === 0) {
      lastPositions.value.push([
        {
          x: position.value.x,
          y: position.value.y,
          z: position.value.z,
        },
      ]);
    } else if (lastPositions.value.length === 1) {
      lastPositions.value[0].push({
        x: position.value.x,
        y: position.value.y,
        z: position.value.z,
      });

      if (lastPositions.value[0].length > 98) {
        lastPositions.value[0].shift();
      }
    } else {
      // Update the last curve
      lastPositions.value[lastPositions.value.length - 1].push({
        x: position.value.x,
        y: position.value.y,
        z: position.value.z,
      });

      // clear the first curve
      if (lastPositions.value[0].length < 4) {
        lastPositions.value.shift();
      } else {
        lastPositions.value[0].shift();
      }

    }
  }
}
</script>

<style scoped></style>

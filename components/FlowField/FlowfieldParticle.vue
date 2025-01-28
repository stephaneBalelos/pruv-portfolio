<template>
  <CatmullRomCurve3
    v-for="(positions, index) in lastPositions"
    ref="particleRefs"
    :key="index"
    :points="positions.map((pos) => new Vector3(pos.x, pos.y, pos.z))"
    :segments="20"
    :line-width="1"
    color="green"
  />
</template>

<script setup lang="ts">
import { shallowRef } from "vue";
import { useFlowfield } from "~/composables/useFlowfield";
import { mapRange } from "~/utils";
import { Vector3 } from "three";
import { useInterval } from "@vueuse/core";

const particleRefs = shallowRef([]);

const { state } = useFlowfield();

const { onBeforeRender } = useLoop();

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
>([
  [
    {
      x: position.value.x,
      y: position.value.y,
      z: position.value.z,
    },
    {
      x: position.value.x,
      y: position.value.y,
      z: position.value.z,
    },
  ],
]);

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
      (-state.cols * state.scale) / 2,
      (state.cols * state.scale) / 2,
      0,
      state.cols
    );
    const y = mapRange(
      position.value.y,
      (-state.rows * state.scale) / 2,
      (state.rows * state.scale) / 2,
      0,
      state.rows
    );

    const index = Math.floor(x) + Math.floor(y) * state.cols;

    const vector = state.flowfield[index];

    state.activeIndex = index;

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
        // copy the first item to the last item to create the last curve
        lastPositions.value.push(lastPositions.value[0]);

        // Update the first item with the current position
        lastPositions.value[0] = [
          {
            x: position.value.x,
            y: position.value.y,
            z: position.value.z,
          },
        ];
    }

    for (let i = 0; i < lastPositions.value.length; i++) {
      // Remove the first position if it's too long
      if (lastPositions.value[i].length > 40) {
        lastPositions.value[i].shift();
      }
      if (i === 0 && position.value) {
        lastPositions.value[i].push({
          x: position.value.x,
          y: position.value.y,
          z: position.value.z,
        });
      }

      if(i > 0) {
        // remove the last position
        if(lastPositions.value[i].length > 2) {
            lastPositions.value[i].shift();
        } else {
            lastPositions.value.splice(i, 1);
        }
      }
    }
  }
}
</script>

<style scoped></style>

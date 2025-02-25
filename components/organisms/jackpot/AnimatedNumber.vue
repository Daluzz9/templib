<script setup lang="ts">
import type { VNodeRef } from "vue";

const props = defineProps({
  value: {
    type: [Number],
    default: 0,
  },
  initNumber: {
    type: Number,
    default: 0,
  },
  class: {
    type: String,
    required: false,
  },
});

const JACKPOT_ANIMATION_SPEED = 100;

const countUpRef = ref<VNodeRef | undefined>(undefined);
const startValue = ref<number>(props.initNumber || Number(props.value));
const animationRaise = startValue.value * 0.1;
const endValue = ref<number>(Number(props.value) + animationRaise);
const duration = ref<number>((animationRaise * 10) / Number(JACKPOT_ANIMATION_SPEED));

watch(
  () => props.initNumber,
  (newNumber) => {
    if (countUpRef.value) {
      startValue.value = newNumber || props.value;
      endValue.value = props.value;
      countUpRef.value.restart();
    }
  },
);
</script>

<template>
  <ClientOnly>
    <CountUpNumber
      :key="initNumber"
      ref="countUpRef"
      :class="cn('text-2xs text-secondary-400 sm:text-sm lg:text-sm', props.class)"
      :end-val="endValue"
      :start-val="startValue"
      :duration="duration"
      :autoplay="true"
    />
  </ClientOnly>
</template>

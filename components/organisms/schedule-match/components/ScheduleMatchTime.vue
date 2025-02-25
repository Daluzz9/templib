<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { Primitive, type PrimitiveProps } from "radix-vue";
import dayjs from "dayjs";

type IProps = PrimitiveProps & {
  class?: HTMLAttributes["class"];
  time: string;
};

const props = withDefaults(defineProps<IProps>(), {
  as: "div",
});
</script>
<template>
  <Primitive :as="as" :class="cn('text-center', props.class)">
    <div class="font-nunito text-xs font-normal text-neutral-300">{{ dayjs(time).format("HH:mm") }}</div>
    <div class="font-nunito text-xs font-normal text-neutral-300">{{ dayjs(time).format("DD/MM") }}</div>
  </Primitive>
</template>

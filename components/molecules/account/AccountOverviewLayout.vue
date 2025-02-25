<script setup lang="ts">
import { Primitive, type PrimitiveProps } from "radix-vue";

type IProps = PrimitiveProps & {
  class?: string;
};
const props = defineProps<IProps>();
</script>
<template>
  <Primitive :as="as" :as-child="asChild" :class="cn('grid grid-flow-col', 'gap-4', props.class)">
    <slot name="left" />
    <slot name="right" />
  </Primitive>
</template>

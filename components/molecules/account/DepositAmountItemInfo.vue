<script setup lang="ts">
import { Primitive, type PrimitiveProps } from "radix-vue";

type IProps = PrimitiveProps & {
  class?: string;
  label: string;
  value: string;
};
const props = withDefaults(defineProps<IProps>(), {
  as: "div",
});
</script>
<template>
  <Primitive :as="as" :as-child="asChild" :class="cn('grid grid-flow-col grid-cols-[auto_1fr] gap-1', props.class)">
    <p class="text-sm font-normal text-text-secondary">{{ label }}</p>
    <!-- Change color of text with option class group. If the text is the last child, change the font to font-normal and color to text-neutral-50 -->
    <p
      class="text-right text-sm font-semibold text-secondary group-last:!font-normal group-last:!text-neutral-50"
      v-html="value"
    />
  </Primitive>
</template>

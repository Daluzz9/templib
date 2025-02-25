<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Primitive, type PrimitiveProps } from "radix-vue";

type IProps = PrimitiveProps & {
  guide: IGuide;
  class?: HTMLAttributes["class"];
};

const props = withDefaults(defineProps<IProps>(), {
  as: "div",
});
</script>

<template>
  <Primitive :as="as" :class="cn('relative flex items-center gap-3', props.class)">
    <div class="relative flex h-8 w-8 items-center justify-center">
      <div class="absolute inset-0 rounded-full border-[1.5px] border-s border-solid border-border-primary" />
      <component :is="guide.icon" class="text-xl text-primary-300" />
    </div>
    <div class="text-sm font-normal [color:currentColor]">{{ guide.text }}</div>
  </Primitive>
</template>

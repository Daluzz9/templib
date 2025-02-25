<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { Primitive, type PrimitiveProps } from "radix-vue";

type IProps = PrimitiveProps & {
  class?: HTMLAttributes["class"];
};

const props = withDefaults(defineProps<IProps>(), {
  as: "div",
});
</script>
<template>
  <Primitive :as="as" :class="props.class">
    <div
      class="flex h-5 w-5 items-center justify-center rounded-full border-0.5 border-solid border-white/10 bg-white/7"
    >
      <SvgoChart />
    </div>
    <slot />
  </Primitive>
</template>

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
  <Primitive
    :as="as"
    :class="
      cn(
        'grid-header col-span-full grid cursor-pointer grid-cols-inherit gap-x-inherit bg-neutral-700 font-nunito text-sm text-neutral-50',
        props.class,
      )
    "
  >
    <slot />
  </Primitive>
</template>

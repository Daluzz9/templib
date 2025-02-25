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
        'grid-body col-span-full grid cursor-pointer grid-cols-inherit gap-x-inherit bg-[#292D30] group-data-[state=collapsed]/table:hidden',
        props.class,
      )
    "
  >
    <slot />
  </Primitive>
</template>

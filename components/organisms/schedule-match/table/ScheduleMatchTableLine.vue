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
        'col-start-2 col-end-9 -ml-6 -mr-4 -mt-px hidden h-px bg-white/10 group-data-[state=expanded]/row:block',
        props.class,
      )
    "
  >
    <slot />
  </Primitive>
</template>

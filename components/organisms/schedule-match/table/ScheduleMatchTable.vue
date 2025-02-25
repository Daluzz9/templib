<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { Primitive, type PrimitiveProps } from "radix-vue";

type IProps = PrimitiveProps & {
  class?: HTMLAttributes["class"];
  isBodyCollapsed?: boolean;
};

const props = withDefaults(defineProps<IProps>(), {
  as: "div",
  isBodyCollapsed: false,
});
</script>

<template>
  <Primitive
    :as="as"
    :data-state="isBodyCollapsed ? 'collapsed' : 'expanded'"
    :class="
      cn(
        'grid-table group/table grid w-full grid-cols-[264px_repeat(2,_160px)_61px_repeat(2,_160px)_63px_92px] gap-x-6',
        props.class,
      )
    "
  >
    <slot />
  </Primitive>
</template>

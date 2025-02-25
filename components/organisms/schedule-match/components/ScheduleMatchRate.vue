<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { Primitive, type PrimitiveProps } from "radix-vue";

type IProps = PrimitiveProps & {
  class?: HTMLAttributes["class"];
  isHighlighted?: boolean;
  isExpanded?: boolean;
};

const props = withDefaults(defineProps<IProps>(), {
  as: "div",
  isHighlighted: false,
  isExpanded: false,
});
</script>
<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="
      cn(
        'relative grid grid-cols-[repeat(3,_40px)] gap-0 rounded-sm outline outline-1 outline-transparent md:grid-cols-[repeat(3,_50px)] md:gap-1',
        isExpanded &&
          'justify-center hover:bg-white/5 hover:outline-white/10 md:grid-cols-[repeat(2,_50px)] md:gap-x-3 md:gap-y-4 md:py-0.5',
        isHighlighted &&
          'bg-[#213F7B]/5 shadow-[-8px_0px_0px_1px_#F48B13] outline-[#F48B13] hover:outline-[#F48B13] md:py-0.5',
        props.class,
      )
    "
  >
    <SvgoBolt v-if="isHighlighted" class="absolute -left-[7.5px] top-1/2 -translate-y-1/2 text-[6px]" />
    <slot />
  </Primitive>
</template>

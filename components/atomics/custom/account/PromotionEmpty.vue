<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Primitive, type PrimitiveProps } from "radix-vue";

type IProps = PrimitiveProps & {
  description?: string;
  class?: HTMLAttributes["class"];
};

const props = withDefaults(defineProps<IProps>(), {
  as: "div",
  description: "Chưa có khuyến mãi nào, quý khách vui lòng quay lại sau!",
});
</script>

<template>
  <Primitive :class="cn('flex flex-col items-center justify-center gap-6', props.class)" :as="as">
    <SvgoAccountHistoryEmpty class="text-[100px] text-white" />
    <p class="text-center text-sm font-normal text-text-secondary lg:text-base">{{ description }}</p>
  </Primitive>
</template>

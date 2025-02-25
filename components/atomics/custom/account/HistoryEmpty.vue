<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Primitive, type PrimitiveProps } from "radix-vue";

type IProps = PrimitiveProps & {
  description?: string;
  class?: HTMLAttributes["class"];
  classImage?: HTMLAttributes["class"];
};

const props = withDefaults(defineProps<IProps>(), {
  as: "div",
  description: "Không tìm thấy kết quả giao dịch nào gần đây.",
});
</script>

<template>
  <Primitive :class="cn('flex flex-col items-center justify-center gap-6', props.class)" :as="as">
    <SvgoAccountHistoryEmpty :class="cn('text-[100px]', props.classImage)" filled />
    <p class="text-center text-sm font-normal text-text-secondary sm:text-primary">{{ description }}</p>
  </Primitive>
</template>

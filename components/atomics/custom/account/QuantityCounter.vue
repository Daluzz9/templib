<script setup lang="ts">
import { Primitive, type PrimitiveProps } from "radix-vue";

type IProps = PrimitiveProps & {
  class?: string;
  isIncrease?: boolean;
  isDisabled?: boolean;
};

const props = withDefaults(defineProps<IProps>(), {
  as: "div",
  isIncrease: false,
  isDisabled: true,
});
</script>

<template>
  <Primitive
    :as="as"
    :class="
      cn(props.class, 'relative h-8 w-8 rounded-sm bg-tab-payment-bgDisabled', {
        'cursor-pointer bg-primary-400': !isDisabled,
      })
    "
  >
    <div
      :class="
        cn(
          'absolute left-1/2 top-1/2 h-[2px] w-4 -translate-x-1/2 -translate-y-1/2 rounded-sm bg-tab-payment-fgDisabled',
          { 'bg-white': !isDisabled },
        )
      "
    />
    <div
      v-if="isIncrease"
      :class="
        cn(
          'absolute left-1/2 top-1/2 h-4 w-[2px] -translate-x-1/2 -translate-y-1/2 rounded-sm bg-tab-payment-fgDisabled',
          { 'bg-white': !isDisabled },
        )
      "
    />
  </Primitive>
</template>

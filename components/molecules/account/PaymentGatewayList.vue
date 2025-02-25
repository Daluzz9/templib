<script setup lang="ts">
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
  <Primitive :as="as" :as-child="asChild" :class="props.class">
    <div class="mb-2 text-center text-sm font-semibold text-text-primary">Chấp nhận chuyển tiền từ</div>
    <Image
      src="account/payment-gateway.webp"
      alt="payment-gateway"
      width="100%"
      height="24px"
      :preload="true"
      img-class="object-contain"
    />
  </Primitive>
</template>

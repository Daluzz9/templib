<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Primitive, type PrimitiveProps } from "radix-vue";
import { paymentMethodNameVariants, paymentMethodVariants, PaymentMethodStatusEnum } from ".";

type IProps = PrimitiveProps & {
  name: string;
  status?: PaymentMethodStatusEnum;
  navigateTo: string;
  isUnderMaintenance?: boolean;
  class: HTMLAttributes["class"];
};

const props = withDefaults(defineProps<IProps>(), {
  as: "div",
  status: PaymentMethodStatusEnum.DEFAULT,
  isUnderMaintenance: false,
});

const methodClass = computed(() =>
  paymentMethodVariants({
    status: props.status,
  }),
);

const methodNameClass = computed(() =>
  paymentMethodNameVariants({
    status: props.status,
  }),
);
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :to="navigateTo" :class="cn(methodClass, props.class)">
    <div v-if="isUnderMaintenance" class="absolute right-0 top-0">
      <div
        class="flex h-3.5 w-11 items-center justify-center rounded-bl-lg rounded-tr-lg bg-neutral-500 text-[8px] font-bold uppercase leading-3 text-text-primary"
      >
        Bảo trì
      </div>
    </div>
    <slot />
    <span :class="methodNameClass">
      {{ name }}
    </span>
  </Primitive>
</template>

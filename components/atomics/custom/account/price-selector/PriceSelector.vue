<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Primitive, type PrimitiveProps } from "radix-vue";
import { amountVariants, priceSelectorVariants } from ".";

type IProps = PrimitiveProps & {
  class?: HTMLAttributes["class"];
  amount: number | string;
  status?: PriceSelectorStatusEnum;
};

const props = withDefaults(defineProps<IProps>(), {
  as: "div",
  status: PriceSelectorStatusEnum.DEFAULT,
});

const priceSelectorClass = computed<string>(() =>
  priceSelectorVariants({
    status: props.status,
  }),
);

const amountClass = computed<string>(() =>
  amountVariants({
    status: props.status,
  }),
);
</script>

<template>
  <Primitive :as="as" :class="cn(priceSelectorClass, props.class)">
    <p :class="amountClass">
      {{ formatVNDCurrency(amount, { currencySymbol: CurrencySymbolEnum.NONE }) }}
    </p>
  </Primitive>
</template>

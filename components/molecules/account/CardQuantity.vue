<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Primitive, type PrimitiveProps } from "radix-vue";

type IProps = PrimitiveProps & {
  class?: HTMLAttributes["class"];
  defaultQuantity?: number;
  minQuantity?: number;
  maxQuantity?: number;
};

const emit = defineEmits(["update-quantity"]);

/*
- defaultQuantity: ui default value is 0, then update to 1 when user selects a price in price-selector list
- only allow user to increase quantity when quantity >= 1
*/

const props = withDefaults(defineProps<IProps>(), {
  as: "div",
  defaultQuantity: 0,
  minQuantity: 1,
  maxQuantity: 100,
});

const quantity = ref<number>(props.defaultQuantity);

const isButtonDecreaseDisabled = computed(() => quantity.value <= props.minQuantity);
const isButtonIncreaseDisabled = computed(() => quantity.value >= props.maxQuantity || quantity.value === 0);

const decreaseQuantity = () => {
  quantity.value--;
};

const increaseQuantity = () => {
  quantity.value++;
};

watch(
  () => props.defaultQuantity,
  (value) => {
    quantity.value = value;
  },
);

watch(
  () => quantity.value,
  (value) => {
    emit("update-quantity", value);
  },
);
</script>

<template>
  <Primitive :as="as" :class="props.class">
    <QuantityCounter
      :is-increase="false"
      :is-disabled="isButtonDecreaseDisabled"
      class="h-8 w-8"
      @click="!isButtonDecreaseDisabled && decreaseQuantity()"
    />
    <span class="text-xl font-semibold text-text-primary">{{ quantity }}</span>
    <QuantityCounter
      is-increase
      :is-disabled="isButtonIncreaseDisabled"
      class="h-8 w-8"
      @click="!isButtonIncreaseDisabled && increaseQuantity()"
    />
  </Primitive>
</template>

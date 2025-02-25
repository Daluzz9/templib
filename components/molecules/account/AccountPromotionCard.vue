<script setup lang="ts">
import { Primitive, type PrimitiveProps } from "radix-vue";

type IProps = PrimitiveProps & {
  title: string;
  description: string;
  class?: string;
  name: string;
  value?: number;
  modelValue: number;
};
const props = withDefaults(defineProps<IProps>(), {
  as: "a",
});

defineEmits<{
  (e: "update:modelValue", payload: string | number): void;
}>();

const { handleChange } = useField(props.name);

const inputValue = defineModel("modelValue", {
  type: [String, Number] as PropType<string | number>,
  required: true,
  set(value) {
    handleChange(Number(value));
    return Number(value);
  },
});
</script>
<template>
  <Primitive :as="as" :as-child="asChild" class="relative block min-w-40" :class="props.class">
    <input :id="`$radio-${value}`" v-model="inputValue" :name="name" :value="value" type="radio" class="peer hidden" />
    <label
      :class="
        cn(
          'relative z-10 box-border block h-14 p-2 text-base font-semibold text-white',
          'font-nunito',
          'hover:cursor-pointer',
          'border-2 border-[transparent] hover:border-primary-300',
          'rounded-lg peer-checked:border-primary-300',
          'bg-[url(/images/account/bg-promotion-card.webp)] bg-cover bg-center',
        )
      "
      :for="`$radio-${value}`"
      :data-value="value"
    >
      <h5 class="isolate">{{ title }}</h5>
      <p class="isolate text-xs">{{ description }}</p>
    </label>
    <div
      class="absolute right-[2px] top-[2px] z-10 hidden h-5 w-5 items-center justify-center rounded-[0_6px] peer-checked:flex peer-checked:bg-primary-300"
    >
      <SvgoTicked class="h-6 w-6 scale-150 text-white" />
    </div>
  </Primitive>
</template>
<style lang="scss" scoped>
label {
  &[data-value="1"] {
    @apply bg-promotion-package-1;
  }
  &[data-value="2"] {
    @apply bg-promotion-package-2;
  }
  &[data-value="5"] {
    @apply bg-promotion-package-5;
  }
  &[data-value="8"] {
    @apply bg-promotion-package-8;
  }
}
</style>

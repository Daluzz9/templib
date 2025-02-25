<script setup lang="ts">
import { Primitive, type PrimitiveProps } from "radix-vue";

type IProps = PrimitiveProps & {
  title: string;
  icon?: string;
  isActive?: boolean;
  navigateTo: string;
  class?: string;
};
const props = withDefaults(defineProps<IProps>(), {
  as: "div",
  isActive: false,
  icon: "",
});
</script>
<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="
      cn(
        { active: isActive },
        'h-full text-base font-semibold text-white',
        'flex flex-col items-center justify-center gap-1',
        'group',
        'font-nunito',
        props.class,
      )
    "
    :to="navigateTo"
  >
    <component :is="icon" :class="cn('text-3xl group-hover:text-primary-300', { 'text-primary-300': isActive })" />
    <p :class="cn('uppercase group-hover:text-primary-300', { 'text-primary-300': isActive })">
      {{ title }}
    </p>
  </Primitive>
</template>

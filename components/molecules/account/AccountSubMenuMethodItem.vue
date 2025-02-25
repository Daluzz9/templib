<script setup lang="ts">
import { Primitive, type PrimitiveProps } from "radix-vue";

type IProps = PrimitiveProps & {
  title?: string;
  isActive?: boolean;
  navigateTo: string;
  class?: string;
  isUnderMaintenance?: boolean;
};
const props = withDefaults(defineProps<IProps>(), {
  isUnderMaintenance: false,
});

const renderComponent = computed(() => {
  return props.isUnderMaintenance ? "div" : props.as;
});
</script>
<template>
  <Primitive
    :as="renderComponent"
    :as-child="asChild"
    :class="
      cn(
        'grid grid-flow-col',
        'relative before:absolute before:bottom-[-1px] before:h-[2px] before:w-full',
        'px-3',
        'text-base font-semibold',
        !isUnderMaintenance ? 'text-white hover:text-primary-300 hover:before:bg-primary-300' : 'text-disable',
        { 'text-primary-300': isActive && !isUnderMaintenance },
        {
          'before:bg-primary-300': isActive && !isUnderMaintenance,
        },
        props.class,
      )
    "
    :to="navigateTo"
  >
    <Image v-if="isUnderMaintenance" src="/account/maintain.webp" class="z-2 absolute -right-2 -top-[11px]" />
    {{ title }}
  </Primitive>
</template>

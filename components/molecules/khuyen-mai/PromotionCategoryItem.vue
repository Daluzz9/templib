<script setup lang="ts">
import { Primitive, type PrimitiveProps } from "radix-vue";
import type { RouteLocationRaw } from "vue-router";

type IProps = PrimitiveProps & {
  title: string;
  icon?: string;
  isActive?: boolean;
  navigateTo: RouteLocationRaw;
};
withDefaults(defineProps<IProps>(), {
  as: "div",
  isActive: false,
  icon: "",
});
</script>
<template>
  <Primitive
    class="group flex h-10 w-full items-center justify-center gap-1 rounded-lg bg-background-popup-header px-3 py-2 hover:bg-primary-400 lg:h-full lg:w-auto lg:px-5 lg:py-3"
    :class="{ 'bg-primary-400': isActive }"
    :as="as"
    :to="navigateTo"
  >
    <Image v-if="icon" :src="icon" width="24px" class="hidden lg:block" :alt="title" />
    <p class="whitespace-nowrap text-sm font-normal text-white lg:text-base">
      {{ title }}
    </p>
  </Primitive>
</template>

<script setup lang="ts">
import { Primitive, type PrimitiveProps } from "radix-vue";
import type { RouteLocationRaw } from "vue-router";

type IProps = PrimitiveProps & {
  title: string;
  img?: string;
  navigateTo: RouteLocationRaw;
  tagImg?: string;
};
withDefaults(defineProps<IProps>(), {
  as: "div",
  img: "",
});
</script>
<template>
  <Primitive class="group relative h-full" :as="as" :to="navigateTo">
    <Image v-if="tagImg" :src="tagImg" class="absolute left-0 top-2" />
    <Image v-if="img" :src="img" class="aspect-[343/114] rounded-lg lg:aspect-img-promotion" />
    <h3 class="mt-2 line-clamp-2 text-sm font-normal leading-[22px] text-text-secondary lg:mt-3 lg:text-base">
      {{ title }}
    </h3>
  </Primitive>
</template>

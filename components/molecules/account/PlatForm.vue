<script lang="ts" setup>
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
  <Primitive
    :as="as"
    :class="cn('flex flex-col items-center gap-2 rounded-lg bg-background-bg-secondary p-3 py-2 sm:py-3', props.class)"
  >
    <div class="title text-sm font-semibold text-text-primary sm:text-base">Các sàn mua bán USDT uy tín</div>
    <div class="flex items-center justify-center gap-6">
      <NuxtLink
        v-for="platform in listPlatforms"
        :key="platform.title"
        class="flex w-[52px] flex-col items-center justify-center gap-1 no-underline"
        :to="platform.url"
        target="_blank"
      >
        <Image class="rounded-lg" height="32px" width="32px" :src="platform.image" alt="icon bank" />
        <p class="text-xs font-normal text-neutral-200">{{ platform.title }}</p>
      </NuxtLink>
    </div>
  </Primitive>
</template>

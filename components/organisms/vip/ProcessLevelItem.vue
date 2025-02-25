<script setup lang="ts">
import type { HTMLAttributes } from "vue";

const props = defineProps<{
  levelItem: ILevelItem;
  class?: HTMLAttributes["class"];
  amountClass?: HTMLAttributes["class"];
  imageClass?: HTMLAttributes["class"];
  levelLabelClass?: HTMLAttributes["class"];
  desLabelClass?: HTMLAttributes["class"];
}>();
</script>

<template>
  <div
    :class="
      cn(
        'relative flex aspect-[236/212] w-full flex-col items-center justify-end overflow-hidden rounded-xl p-5',
        props.class,
      )
    "
  >
    <div :class="cn('pb-4 text-xl font-bold text-text-money', amountClass)">
      {{ levelItem.amountVND }}
    </div>
    <div :class="cn('mb-4 aspect-[64/56] w-[64px]', imageClass)">
      <Image :src="levelItem.icon" :alt="levelItem.levelLabel" preload :show-placeholder="false" />
    </div>
    <div
      :class="
        cn(
          'text- mb-3 flex h-6 w-20 items-center justify-center rounded-2xl border-[1px] border-solid border-[rgba(6,6,6,0.8)] bg-neutral-50 text-center text-sm font-semibold text-black',
          levelLabelClass,
        )
      "
    >
      {{ levelItem.levelLabel }}
    </div>
    <div :class="cn('text-sm font-normal text-text-secondary', desLabelClass)">
      {{ levelItem.description }}
    </div>
    <Image
      :src="levelItem.isActive ? 'vip/bg-active-level.webp' : 'vip/bg-level.webp'"
      alt="bg-level"
      class="absolute inset-0 z-[-1]"
      preload
      :show-placeholder="false"
    />
  </div>
</template>

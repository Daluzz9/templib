<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { Primitive, type PrimitiveProps } from "radix-vue";
import dayjs from "dayjs";

type ITeam = {
  logo: string;
  name: string;
};

type IProps = PrimitiveProps & {
  class?: HTMLAttributes["class"];
  homeTeam: ITeam;
  time: string;
  awayTeam: ITeam;
};

const props = withDefaults(defineProps<IProps>(), {
  as: "div",
});
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="cn('grid grid-cols-[1fr_auto_1fr] gap-1 p-3', props.class)">
    <div class="flex w-full items-center justify-start">
      <Image :src="homeTeam.logo" :alt="homeTeam.name" class="flex-none" height="40px" />
      <p class="ml-1 line-clamp-2 text-neutral-100">{{ homeTeam.name }}</p>
    </div>
    <div class="justify-self-center text-center">
      <div class="text-white">{{ dayjs(time).format("HH:mm") }}</div>
      <div class="text-neutral-200">{{ dayjs(time).format("DD/MM") }}</div>
    </div>
    <div class="flex w-full items-center justify-end">
      <p class="mr-1 line-clamp-2 text-right text-neutral-100">{{ awayTeam.name }}</p>
      <Image :src="awayTeam.logo" :alt="awayTeam.name" class="flex-none" height="40px" />
    </div>
  </Primitive>
</template>

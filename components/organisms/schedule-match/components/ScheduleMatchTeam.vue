<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { Primitive, type PrimitiveProps } from "radix-vue";

type IProps = PrimitiveProps & {
  class?: HTMLAttributes["class"];
  nameClass?: HTMLAttributes["class"];
  imageClass?: HTMLAttributes["class"];
  logo: string;
  name: string;
  width?: string;
  height?: string;
  isHandicap?: boolean;
};

const props = withDefaults(defineProps<IProps>(), {
  as: "div",
  width: "24px",
  height: "24px",
  isHandicap: false,
});
</script>
<template>
  <Primitive :as="as" :as-child="asChild" :class="cn('flex items-center gap-2', props.class)">
    <div :class="cn('flex-none overflow-hidden rounded-full', props.imageClass)">
      <Image
        img-class="w-auto"
        placeholder-src="/sport/sport-schedule/logo-league-default.svg"
        :src="logo"
        :alt="name"
        :width="width"
        :height="height"
      />
    </div>
    <div :class="cn('line-clamp-1 text-left font-nunito text-sm font-semibold text-neutral-50', props.nameClass)">
      {{ name }}
      <span v-if="isHandicap" class="text-negative-500">(C)</span>
    </div>
  </Primitive>
</template>

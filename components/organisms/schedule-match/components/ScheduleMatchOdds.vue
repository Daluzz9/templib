<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { Primitive, type PrimitiveProps } from "radix-vue";

type IProps = PrimitiveProps & {
  class?: HTMLAttributes["class"];
  odds?: number | string | undefined;
  isOverOdds?: boolean;
};

const props = withDefaults(defineProps<IProps>(), {
  as: "div",
  odds: 0,
  isOverOdds: false,
});

const $device = useDevice();
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="
      cn(
        'odds min-w-[40px] rounded-sm text-center font-nunito text-sm font-normal leading-6 transition duration-200 ease-linear md:min-w-[50px]',
        Number(odds) <= 0 || isNaN(Number(odds)) ? 'text-negative-500' : 'text-[#11A95D]',
        !isOverOdds && 'hover:bg-white/5',
        props.class,
      )
    "
  >
    <template v-if="isOverOdds">{{ odds ? "u" : $device.isMobileOrTablet ? "-" : "--" }}</template>
    <template v-else>{{ odds ? formatFixNumber(odds, 2) : $device.isMobileOrTablet ? "-" : "--" }}</template>
  </Primitive>
</template>

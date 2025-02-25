<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { bonusRowVariants, type IBonusRowVariants } from "~/components/molecules/bonus/index";

type IProps = {
  label: string;
  value: string;
  valueClass?: HTMLAttributes["class"];
  textSize?: NonNullable<IBonusRowVariants["textSize"]>;
};

const props = defineProps<IProps>();
</script>
<template>
  <div v-if="label" class="font-normal text-neutral-300" :class="bonusRowVariants({ textSize })">
    {{ label }}
  </div>
  <div
    v-if="value"
    :class="cn('text-base font-semibold text-primary', bonusRowVariants({ textSize }), props.valueClass)"
  >
    {{ value }}
  </div>
</template>

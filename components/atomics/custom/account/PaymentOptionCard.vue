<script setup lang="ts">
import { Primitive, type PrimitiveProps } from "radix-vue";

type IProps = PrimitiveProps & {
  class?: string;
  icon: string;
  title: string;
  description?: string;
  isUnderMaintenance?: boolean;
};

const props = withDefaults(defineProps<IProps>(), {
  as: "div",
  description: "",
  isUnderMaintenance: false,
});
</script>

<template>
  <Primitive :as="as" :class="cn('relative flex items-center rounded-lg bg-background-bg-secondary p-3', props.class)">
    <div v-if="isUnderMaintenance" class="absolute right-0 top-0">
      <slot name="suffix-top">
        <div class="h-max min-w-12 rounded-bl-lg bg-background-disable px-2 text-xs font-bold text-primary">
          Bảo trì
        </div>
      </slot>
    </div>

    <div class="flex w-full items-center justify-between gap-2">
      <div class="flex items-center gap-3">
        <Image
          :src="icon"
          height="32px"
          width="32px"
          :style="{ filter: isUnderMaintenance ? 'grayscale(1)' : 'none' }"
        />

        <div class="flex flex-col gap-1">
          <div
            class="text-base font-semibold leading-[22px]"
            :class="isUnderMaintenance ? 'text-disable' : 'text-primary'"
          >
            {{ title }}
          </div>
          <p class="text-sm" :class="isUnderMaintenance ? 'text-disable' : 'text-neutral-200'">
            {{ description }}
          </p>
        </div>
      </div>
    </div>
  </Primitive>
</template>

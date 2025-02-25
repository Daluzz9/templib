<script setup lang="ts">
type IProps = {
  class?: string;
  to: string;
  icon: unknown;
  title: string;
  description?: string;
  isUnderMaintenance?: boolean;
};

const props = withDefaults(defineProps<IProps>(), {
  as: "div",
  description: "",
  isUnderMaintenance: false,
});

const { handleNavigation } = useSidebarMenu();
</script>

<template>
  <button
    type="button"
    :class="cn('relative flex items-center rounded-lg bg-background-bg-secondary p-3', props.class)"
    @click="!isUnderMaintenance && handleNavigation(to)"
  >
    <div v-if="isUnderMaintenance" class="absolute right-0 top-0">
      <slot name="suffix-top">
        <div
          class="h-max min-w-12 rounded-bl-lg rounded-tr-lg bg-background-disable px-2 text-xs font-bold text-primary"
        >
          Bảo trì
        </div>
      </slot>
    </div>

    <div class="flex w-full items-center justify-between gap-2">
      <div class="flex items-center gap-3">
        <component :is="icon" v-if="icon" class="text-[32px]" filled :class="{ grayscale: isUnderMaintenance }" />

        <div class="flex flex-col items-start gap-1">
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
  </button>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string;
  }>(),
  {},
);
</script>
<template>
  <div>
    <div class="flex items-center">
      <slot name="header">
        <h2 v-if="title" class="mb-1 font-bold text-neutral-50 lg:mb-3 lg:text-2xl">
          {{ title }}
        </h2>
      </slot>

      <div v-if="$slots.sub" class="mb-3 ml-auto text-xs lg:text-sm">
        <slot name="sub" />
      </div>
    </div>

    <slot />
  </div>
</template>

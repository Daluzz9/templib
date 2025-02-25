<script setup lang="ts">
import { ToastViewport, type ToastViewportProps } from "radix-vue";
import { computed, type HTMLAttributes } from "vue";

const props = defineProps<ToastViewportProps & { class?: HTMLAttributes["class"] }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <ToastViewport
    v-bind="delegatedProps"
    :class="
      cn(
        'fixed bottom-[var(--mb-nav-height)] z-toast flex max-h-screen w-full max-w-[420px] flex-col-reverse p-4 sm:bottom-0 sm:left-1/2 sm:top-auto sm:-translate-x-1/2 sm:flex-col',
        props.class,
      )
    "
  />
</template>

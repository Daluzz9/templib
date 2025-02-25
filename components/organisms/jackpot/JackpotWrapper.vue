<script lang="ts" setup>
const props = defineProps<{ class?: string }>();
</script>

<template>
  <div
    :class="cn('py-1/2 flex w-fit items-center justify-center rounded-2xl bg-[#06060680] px-3 text-sm', props.class)"
  >
    <slot />
  </div>
</template>

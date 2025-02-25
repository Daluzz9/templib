<script setup lang="ts">
defineProps<{
  isLoading?: boolean;
}>();
</script>

<template>
  <LoadingSpinner v-if="isLoading" />
  <div v-else class="flex flex-col">
    <div class="mb-6">
      <slot name="levels" />
    </div>
    <slot name="table" />
  </div>
</template>

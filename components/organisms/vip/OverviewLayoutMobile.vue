<script setup lang="ts">
defineProps<{
  isLoading?: boolean;
}>();
</script>

<template>
  <div class="flex flex-col">
    <LoadingSpinner v-if="isLoading" />
    <div v-else class="flex flex-col">
      <div class="rounded-lg bg-background-bg-secondary p-3">
        <div class="mb-6">
          <slot name="levels" />
        </div>
        <slot name="table" />
      </div>
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
type IProps = {
  isLoading?: boolean;
  isEmpty?: boolean;
};

withDefaults(defineProps<IProps>(), {
  loading: false,
  isEmpty: false,
});
</script>

<template>
  <div>
    <slot v-if="isLoading" name="loading">
      <div class="mt-14 flex h-20 w-full items-center justify-center">
        <LoadingSpinner />
      </div>
    </slot>
    <slot v-else-if="isEmpty" name="empty">
      <EmptyCard class="items-center justify-center" />
    </slot>
    <div v-else class="p-4 md:p-0">
      <slot name="content" />
    </div>
  </div>
</template>

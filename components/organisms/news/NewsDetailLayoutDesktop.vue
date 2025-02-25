<script setup lang="ts">
type IProps = {
  isLoading?: boolean;
};

withDefaults(defineProps<IProps>(), {
  isLoading: false,
});
</script>

<template>
  <NewsContentLayoutDesktop :is-loading="isLoading">
    <template #content>
      <slot name="header" />
      <slot name="content" />
      <slot name="related-news" />
    </template>
  </NewsContentLayoutDesktop>
</template>

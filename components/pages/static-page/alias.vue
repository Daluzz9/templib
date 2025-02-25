<script setup lang="ts">
const { postDetail, status } = useStaticAndNewsDetail();
</script>

<template>
  <div v-if="status === 'pending'" class="py-4">
    <LoadingSpinner />
  </div>
  <template v-else>
    <HTMLRenderer :html-content="postDetail?.content" />
  </template>
</template>

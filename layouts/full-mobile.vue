<script setup lang="ts">
const route = useRoute();
const { systemSeoByPage } = useSystemSeo(route);
</script>
<template>
  <main class="min-h-dvh">
    <slot />
  </main>
  <SeoContent :title="systemSeoByPage.content_title" :description="systemSeoByPage.content_description" />
</template>

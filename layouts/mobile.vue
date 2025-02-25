<script setup lang="ts">
const route = useRoute();
const { systemSeoByPage } = useSystemSeo(route);
const isHiddenHeadingSeo = computed(() => route.path !== APP_PATH.HOME);
const isHiddenHeader = computed(() => route.path.startsWith(APP_PATH.PROMOTION));
const contentHeightClass = isHiddenHeader.value ? "h-[calc(100dvh-55px)]" : "h-[calc(100dvh-107px)]";
</script>

<template>
  <HeaderMobile v-if="!isHiddenHeader" />
  <main :class="[contentHeightClass, 'overflow-y-scroll']">
    <slot />
  </main>

  <NavigationBarMobile />
  <SeoContent
    v-if="isHiddenHeadingSeo"
    :title="systemSeoByPage.content_title"
    :description="systemSeoByPage.content_description"
  />
</template>

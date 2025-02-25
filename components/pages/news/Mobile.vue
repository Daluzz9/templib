<script setup lang="ts">
const { categories, error, status, newsCategoryTabs, currentCategoryBySlug } = useNewsTab();
</script>

<template>
  <NewsLayoutMobile>
    <!-- Sion: handle 2 case nay nha -->
    <template v-if="status === 'pending'"></template>
    <template v-if="error"></template>
    <template v-if="useRoute().name !== BaseRouteNameEnum.NEWS_ALIAS" #category>
      <Tabs v-if="categories && categories?.length > 1" :default-value="currentCategoryBySlug?.alias" class="pt-4">
        <CategoryTabList
          :category-tabs="newsCategoryTabs"
          class="w-100vw no-scrollbar flex flex-row justify-start gap-2 overflow-auto px-4"
          tab-container-class="rounded-lg bg-neutral-600 px-3 h-9 bg-tab-news-bgInactive"
          tab-content-class="text-sm font-normal"
          :auto-scroll-to-value="useRoute().params?.slug?.toString()"
        />
      </Tabs>
    </template>
    <template #content>
      <NuxtPage />
    </template>
  </NewsLayoutMobile>
</template>

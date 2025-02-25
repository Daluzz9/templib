<script setup lang="ts">
const { categories, error, status, newsCategoryTabs, currentCategoryBySlug } = useNewsTab();
</script>

<template>
  <NewsLayoutDesktop>
    <template #title>
      <h2>Tin Tức</h2>
    </template>
    <template #category>
      <!-- Sion: handle 2 case nay nha -->
      <template v-if="status === 'pending'"></template>
      <template v-if="error"></template>
      <Tabs v-if="categories && categories?.length > 1" :model-value="currentCategoryBySlug?.alias">
        <CategoryTabList
          :category-tabs="newsCategoryTabs"
          class="flex flex-row justify-start gap-2"
          tab-container-class="rounded-lg bg-neutral-600 px-5 h-10 bg-tab-news-bgInactive"
          tab-content-class="text-base font-normal"
        />
      </Tabs>
    </template>
    <template #content>
      <NuxtPage />
    </template>
  </NewsLayoutDesktop>
</template>

<script setup lang="ts">
const { categories, currentCategoryBySlug, currentMainTab, commonCategoryTabs } = useStaticPageTab();
</script>

<template>
  <StaticLayoutDesktop :category-tabs="staticPageTabs" :default-value="currentMainTab?.value">
    <Tabs v-if="categories && categories.length > 1" :model-value="currentCategoryBySlug?.alias">
      <CategoryTabList
        :category-tabs="commonCategoryTabs"
        class="mb-4 flex flex-row gap-2"
        tab-container-class="mb-4 rounded-lg bg-neutral-600 px-5 py-2"
        tab-content-class="text-base font-normal"
        icon-class="hidden"
      />
    </Tabs>
    <NuxtPage />
  </StaticLayoutDesktop>
</template>

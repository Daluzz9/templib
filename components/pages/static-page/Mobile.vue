<script setup lang="ts">
const { commonCategoryTabsExcludeCurrentRoute, currentCategoryBySlug } = useStaticPageTab();
</script>

<template>
  <PageLayoutMobile class="bg-background-popup-body" bottom-class="relative p-4" main-class="px-4 pt-4">
    <template #header>
      <PageHeaderMobile title="Chi tiết" show-user-auth @back="useRouter().back()" />
    </template>
    <template #main>
      <NuxtPage />
    </template>
    <template #bottom>
      <Tabs orientation="vertical" :default-value="currentCategoryBySlug?.alias">
        <CategoryTabList
          :category-tabs="commonCategoryTabsExcludeCurrentRoute"
          tab-container-class="min-h-[56px] w-full flex justify-start rounded-[6px] bg-background-bg-secondary hover:bg-background-bg-secondary data-[state=active]:bg-background-bg-secondary px-4"
          tab-content-class="text-base font-normal text-primary gap-2"
          class="flex flex-col gap-4"
          icon-class="min-h-6 min-w-6"
        />
      </Tabs>
    </template>
  </PageLayoutMobile>
</template>

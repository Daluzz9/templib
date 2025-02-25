<script lang="ts" setup>
import { NuxtLink } from "#components";
import { tabs } from "./static";

const { categories } = useCategoriesByAlias({ alias: CategoryAliasEnum.KHUYEN_MAI });

watchEffect(() => {
  if (useRoute().path === APP_PATH.PROMOTION_CATEGORY && categories.value?.[0]) {
    navigateTo(`${APP_PATH.PROMOTION_CATEGORY}/${categories.value?.[0]?.alias}`);
  }
});
</script>
<template>
  <PageLayoutMobile class="min-h-dvh bg-background-popup-body">
    <template #header>
      <HeaderMobile />
    </template>
    <template #main>
      <div class="h-full w-full p-4">
        <Tabs class="flex h-10 items-center justify-between gap-2 overflow-x-auto" orientation="horizontal">
          <PromotionCategoryItem
            v-for="category in categories"
            :key="category.alias"
            :title="category.display_name"
            :icon="category.icon"
            :navigate-to="{
              path: `${APP_PATH.PROMOTION_CATEGORY}/${category.alias}`,
            }"
            :as="NuxtLink"
            :is-active="category.alias === useRoute().params.slug"
          />
          <PromotionCategoryItem
            v-for="item in tabs"
            :key="item.alias"
            :title="item.display_name"
            :icon="item.icon"
            :navigate-to="{
              path: `${APP_PATH.PROMOTION}/${item.alias}`,
            }"
            :as="NuxtLink"
            :is-active="item.alias === useRoute().path"
          />
        </Tabs>
        <section class="mt-4 h-auto">
          <NuxtPage />
        </section>
      </div>
    </template>
  </PageLayoutMobile>
</template>

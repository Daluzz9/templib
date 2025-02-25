<script setup lang="ts">
import { NuxtLink } from "#components";
import dayjs from "dayjs";
import { tabs } from "./static";

const titlePromotion = `Khuyến mãi và Sự kiện hot nhất tháng ${dayjs().format("MM/YYYY")}`;

const route = useRoute();
const { categories, status } = useCategoriesByAlias({ alias: CategoryAliasEnum.KHUYEN_MAI });

watchEffect(() => {
  if (useRoute().path === APP_PATH.PROMOTION_CATEGORY && categories.value?.[0]) {
    navigateTo(`${APP_PATH.PROMOTION_CATEGORY}/${categories.value?.[0]?.alias}`, { replace: true });
  }
});
</script>
<template>
  <div class="px-8 py-6">
    <div class="mx-auto max-w-account">
      <h3 class="text-2xl font-bold text-primary">{{ titlePromotion }}</h3>

      <LoadingSpinner v-if="status === 'pending'" position="center" class="min-h-[300px]" />
      <Tabs class="mt-4 h-10 items-center gap-2" :class="status === 'pending' ? 'hidden' : 'flex'">
        <PromotionCategoryItem
          v-for="category in categories"
          :key="category.alias"
          :title="category.display_name"
          :icon="category.icon"
          :navigate-to="{
            path: `${APP_PATH.PROMOTION_CATEGORY}/${category.alias}`,
          }"
          :as="NuxtLink"
          :is-active="route.params.slug === category.alias"
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
          :is-active="item.alias === route.path"
        />
      </Tabs>
      <section v-show="status !== 'pending'" class="mt-6">
        <NuxtPage />
      </section>
    </div>
  </div>
</template>

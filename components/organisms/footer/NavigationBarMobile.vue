<script setup lang="ts">
import { mbNavigationItems, type IFooterMobileItem } from "./static";
const route = useRoute();

const menuItems = computed(() => {
  return mbNavigationItems.filter((item) => {
    if (route.path === APP_PATH.HOME) {
      return item.url !== APP_PATH.HOME;
    }
    return item.url !== APP_PATH.PROMOTION;
  });
});

const checkActive = (item: IFooterMobileItem) => {
  const exactMatchItem = menuItems.value.find((item) => {
    return item.activeUrl === route.path;
  });

  if (exactMatchItem) return exactMatchItem === item;

  return !!item.activeUrl && route.path.startsWith(item.activeUrl);
};
</script>
<template>
  <div
    class="h-mbNab fixed bottom-0 z-footer flex w-full items-center justify-between border-t border-[#3F4348] bg-neutral-700"
  >
    <NuxtLink
      v-for="menuItem in menuItems"
      :key="menuItem.name"
      class="flex flex-1 flex-col items-center justify-center p-1"
      :class="{
        active: checkActive(menuItem),
      }"
      :to="menuItem.url"
    >
      <Image class="icon" :src="menuItem.icon" :alt="menuItem.name" height="28px" width="28px" />

      <div class="z-50 text-[11px] text-neutral-50">
        {{ menuItem.name }}
      </div>
    </NuxtLink>
  </div>
</template>

<style scoped lang="scss">
.active {
  position: relative;
  height: 100%;
  background: linear-gradient(180deg, #3d4247 28.56%, #2f373d 100%);
  border-bottom: #ffa71a 2px solid;
}
</style>

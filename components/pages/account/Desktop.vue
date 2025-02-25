<script setup lang="ts">
import { NuxtLink } from "#components";

const menus = computed(() => accountMenuList.filter((item) => !item.isHiddenInTab));
</script>
<template>
  <div class="container">
    <div class="py-8">
      <Tabs
        :class="
          cn(
            'w-100 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.04) mb-4',
            'h-[78px] items-center rounded-lg bg-background-menu-account',
            `grid grid-flow-col grid-cols-7`,
          )
        "
      >
        <AccountDesktopMenuItem
          v-for="menu in menus"
          :key="menu.name"
          :title="menu.shortName || menu.name"
          :icon="menu.icon"
          :navigate-to="menu.activeUrl"
          :is-active="$route.path?.includes(menu.activeUrlRelative) || $route.path?.includes(menu.activeUrl)"
          :as="NuxtLink"
        />
      </Tabs>
      <NuxtPage />
    </div>
  </div>
</template>

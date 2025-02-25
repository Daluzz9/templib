<script lang="ts" setup>
import { navList, type INavItem } from "./staticData";

const route = useRoute();

const checkActive = (nav: INavItem) => {
  if (route.path.startsWith(APP_PATH.CASINO)) {
    return nav.path.startsWith(APP_PATH.CASINO);
  }

  if (route.path.startsWith(APP_PATH.SPORT)) {
    return nav.path.startsWith(APP_PATH.SPORT);
  }

  return nav.path === route.path;
};
</script>

<template>
  <div class="bg-primary-500 py-2.5">
    <ul class="container flex h-full items-center justify-between">
      <NuxtLink
        v-for="nav in navList"
        :key="nav.label"
        :to="nav.path === APP_PATH.SANH_CASINO ? APP_PATH.CASINO : nav.path"
        class="group relative flex h-full flex-col items-center justify-center gap-1.5 text-xs capitalize tracking-wide lg:flex-row xl:text-base"
      >
        <component
          :is="nav.icon"
          :class="
            cn('text-2xl group-hover:text-secondary-400', {
              'text-secondary-400': checkActive(nav),
            })
          "
        />
        <p class="group-hover:text-secondary-400" :class="{ 'text-secondary-400': checkActive(nav) }">
          {{ nav.label }}
        </p>

        <div v-if="checkActive(nav)" class="absolute -bottom-2.5 h-[3px] w-full rounded-t bg-secondary-400" />
      </NuxtLink>
    </ul>
  </div>
</template>

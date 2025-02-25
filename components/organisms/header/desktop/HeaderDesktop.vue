<script setup lang="ts">
import { NuxtLink } from "#components";

const route = useRoute();
const { currentUser } = useCurrentUser();

const handleClickHeaderLogo = () => {
  if (route.fullPath === APP_PATH.HOME) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
};
</script>
<template>
  <header class="sticky left-0 top-0 z-header">
    <div class="h-16 bg-background-pc">
      <div class="container flex h-full items-center justify-between">
        <div class="flex items-center gap-4">
          <NuxtLink :to="APP_PATH.HOME">
            <Image
              src="logo.webp"
              alt="logo"
              width="100px"
              height="24px"
              :preload="true"
              img-class="object-contain"
              class="cursor-pointer"
              self-host
              @click="handleClickHeaderLogo"
            />
          </NuxtLink>
          <NuxtLink class="flex w-fit items-center gap-2" :to="APP_PATH.PROMOTION">
            <Image
              src="promotion-star.webp"
              width="38px"
              height="40px"
              :preload="true"
              img-class="object-contain"
              alt="promotion star"
            />
            <span>Khuyến mãi</span>
          </NuxtLink>
        </div>

        <!-- Authentication form + User info -->
        <div class="flex items-center justify-center gap-3">
          <!-- Authentication form -->
          <UnAuthenticatedDesktop v-if="!currentUser" />

          <!-- User info -->
          <AuthenticatedDesktop v-else />
        </div>
      </div>
    </div>

    <SubNavigationDesktop />
  </header>
</template>

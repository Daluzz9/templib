<script setup lang="ts">
import LoggedUser from "./logged-user.vue";
import NotLoggedUser from "./not-logged-user.vue";

const { currentUser } = useCurrentUser();
</script>
<template>
  <div class="sticky left-0 top-0 z-50 h-[52px] bg-neutral-750">
    <div class="container flex items-center justify-between py-2">
      <slot name="left">
        <NuxtLink :to="APP_PATH.HOME">
          <Image width="80px" src="logo.webp" alt="logo" />
        </NuxtLink>
      </slot>
      <LoggedUser v-if="currentUser" />
      <NotLoggedUser v-else />
    </div>
  </div>
</template>

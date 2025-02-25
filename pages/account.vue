<script setup lang="ts">
// import useBase from "~/composables/useBase";
import Desktop from "~/components/pages/account/Desktop.vue";

const $device = useDevice();
const component = $device.isMobileOrTablet ? resolveComponent("NuxtPage") : Desktop;

definePageMeta({
  middleware: ["auth"],
});
</script>
<template>
  <ClientOnly>
    <component :is="component" />
    <template #fallback>
      <div class="flex min-h-account items-center justify-center">
        <LoadingSpinner />
      </div>
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
import Desktop from "~/components/pages/account/withdraw/DesktopWithdrawLayout.vue";

const $device = useDevice();
const component = $device.isMobileOrTablet ? resolveComponent("NuxtPage") : Desktop;

definePageMeta({
  middleware: ["withdraw-maintain"],
});
</script>

<template>
  <component :is="component" />
</template>

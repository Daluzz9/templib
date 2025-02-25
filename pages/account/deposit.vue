<script setup lang="ts">
import Desktop from "~/components/pages/account/deposit/DesktopDepositLayout.vue";

const { $device } = useNuxtApp();
const component = $device.isMobileOrTablet ? resolveComponent("NuxtPage") : Desktop;

definePageMeta({
  middleware: ["deposit-maintain"],
});
</script>

<template>
  <ClientOnly>
    <component :is="component" />
  </ClientOnly>
</template>
<style scoped lang="scss"></style>

<script setup lang="ts">
import Desktop from "~/components/pages/account/deposit/crypto/DesktopDepositCrypto.vue";
import Mobile from "~/components/pages/account/deposit/crypto/MobileDepositCrypto.vue";
const $device = useDevice();
const component = $device.isMobileOrTablet ? Mobile : Desktop;
</script>

<template>
  <component :is="component" />
</template>

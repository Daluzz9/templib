<script setup lang="ts">
// import useBase from "~/composables/useBase";
import Desktop from "~/components/pages/account/withdraw/bank/WithdrawBankDesktop.vue";
import Mobile from "~/components/pages/account/withdraw/bank/WithdrawBankMobile.vue";

const { $device } = useNuxtApp();
const component = $device.isMobileOrTablet ? Mobile : Desktop;
</script>

<template>
  <ClientOnly>
    <component :is="component" />
  </ClientOnly>
</template>

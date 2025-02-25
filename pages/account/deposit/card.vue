<script setup lang="ts">
// import useBase from "~/composables/useBase";
import Desktop from "~/components/pages/account/deposit/card/DepositCardDesktop.vue";
import Mobile from "~/components/pages/account/deposit/card/DepositCardMobile.vue";

const { $device } = useNuxtApp();
const component = $device.isMobileOrTablet ? Mobile : Desktop;
</script>

<template>
  <component :is="component" />
</template>

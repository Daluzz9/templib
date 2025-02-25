<script setup lang="ts">
// import useBase from '~/composables/useBase'
import Desktop from "~/components/pages/account/deposit/bank.vue";
import Mobile from "~/components/pages/account/deposit/BankMobile.vue";

const { $device } = useNuxtApp();
const component = $device.isMobileOrTablet ? Mobile : Desktop;
</script>

<template>
  <ClientOnly>
    <component :is="component" />
  </ClientOnly>
</template>

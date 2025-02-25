<script setup lang="ts">
// import useBase from "~/composables/useBase";
import Desktop from "~/components/pages/account/history/transactions/Transactions.vue";
import Mobile from "~/components/pages/account/history/transactions/table/TransactionTableMobile.vue";

const $device = useDevice();
const component = $device.isMobileOrTablet ? Mobile : Desktop;
</script>

<template>
  <component :is="component" />
</template>

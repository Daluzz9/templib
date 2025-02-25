<script setup lang="ts">
import Desktop from "~/components/pages/account/history/bets/Bets.vue";
import Mobile from "~/components/pages/account/history/bets/table/BetsTableMobile.vue";

const $device = useDevice();
const component = $device.isMobileOrTablet ? Mobile : Desktop;
</script>

<template>
  <component :is="component" />
</template>

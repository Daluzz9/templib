<script setup lang="ts">
// import useBase from "~/composables/useBase";
import Desktop from "~/components/pages/trading-p2p/Desktop.vue";
import Mobile from "~/components/pages/trading-p2p/Mobile.vue";
const $device = useDevice();
const component = $device.isMobileOrTablet ? Mobile : Desktop;
</script>

<template>
  <component :is="component" />
</template>

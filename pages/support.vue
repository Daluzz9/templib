<script setup lang="ts">
import Mobile from "~/components/pages/support/Mobile.vue";

const $device = useDevice();
const component = $device.isMobileOrTablet ? Mobile : null; // TODO: add desktop component here later
</script>

<template>
  <component :is="component" />
</template>

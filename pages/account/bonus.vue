<script setup lang="ts">
import Desktop from "~/components/pages/bonus/Desktop.vue";
import Mobile from "~/components/pages/bonus/Mobile.vue";

const device = useDevice();
const component = device.isMobileOrTablet ? Mobile : Desktop;
</script>

<template>
  <component :is="component" />
</template>

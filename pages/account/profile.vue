<script setup lang="ts">
// import useBase from "~/composables/useBase";
import Desktop from "~/components/pages/account/profile/Desktop.vue";
import Mobile from "~/components/pages/account/profile/Mobile.vue";

const $device = useDevice();
const component = $device.isMobileOrTablet ? Mobile : Desktop;
</script>

<template>
  <component :is="component" />
</template>

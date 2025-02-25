<script setup lang="ts">
// import useBase from "~/composables/useBase";
import Desktop from "~/components/pages/account/bank/Desktop.vue";
import Mobile from "~/components/pages/account/bank/Mobile.vue";
const $device = useDevice();
const component = $device.isMobileOrTablet ? Mobile : Desktop; //TODO add mobile component later
</script>
<template>
  <component :is="component" />
</template>

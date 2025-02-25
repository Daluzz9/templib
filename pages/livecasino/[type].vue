<script setup>
import Desktop from "~/components/pages/livecasino/type/Desktop.vue";
import Mobile from "~/components/pages/livecasino/type/Mobile.vue";

const { $device } = useNuxtApp();
const component = $device.isMobileOrTablet ? Mobile : Desktop;
</script>

<template>
  <component :is="component" />
</template>

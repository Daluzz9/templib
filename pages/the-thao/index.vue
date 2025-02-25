<script setup>
import Desktop from "~/components/pages/the-thao/Desktop.vue";
import Mobile from "~/components/pages/the-thao/Mobile.vue";

const { $device } = useNuxtApp();
const component = $device.isMobileOrTablet ? Mobile : Desktop;
</script>

<template>
  <component :is="component" />
</template>

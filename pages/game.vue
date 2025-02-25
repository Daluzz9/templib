<script setup>
import Desktop from "~/components/pages/game/Desktop.vue";
import Mobile from "~/components/pages/game/Mobile.vue";

const { $device } = useNuxtApp();
const component = $device.isMobileOrTablet ? Mobile : Desktop;
</script>

<template>
  <component :is="component" />
</template>

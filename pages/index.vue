<script setup lang="ts">
import Desktop from "~/components/pages/home/Desktop.vue";
import Mobile from "~/components/pages/home/Mobile.vue";

const device = useDevice();
</script>

<template>
  <Desktop v-if="device.isDesktop" />
  <Mobile v-else />
</template>

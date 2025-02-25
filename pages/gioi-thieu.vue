<script setup>
import Desktop from "~/components/pages/static-page/Desktop.vue";
import Mobile from "~/components/pages/static-page/Mobile.vue";
</script>

<template>
  <Desktop v-if="useDevice().isDesktop" />
  <Mobile v-else></Mobile>
</template>

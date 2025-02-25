<script setup lang="ts">
import Desktop from "~/components/pages/vip/Desktop.vue";
import Mobile from "~/components/pages/vip/Mobile.vue";

const component = useDevice().isDesktop ? Desktop : Mobile;
</script>

<template>
  <component :is="component" />
</template>

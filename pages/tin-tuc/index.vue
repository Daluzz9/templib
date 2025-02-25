<script setup lang="ts">
import Desktop from "~/components/pages/news/NewsHomeDesktop.vue";
import Mobile from "~/components/pages/news/NewsHomeMobile.vue";

const component = useDevice().isDesktop ? Desktop : Mobile;
</script>

<template>
  <component :is="component" />
</template>

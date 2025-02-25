<script setup lang="ts">
import Desktop from "~/components/pages/news/Desktop.vue";
import Mobile from "~/components/pages/news/Mobile.vue";

const component = useDevice().isDesktop ? Desktop : Mobile;
</script>

<template>
  <component :is="component" />
</template>

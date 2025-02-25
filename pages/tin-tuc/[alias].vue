<script setup lang="ts">
import Desktop from "~/components/pages/news/NewsDetail.vue";
import Mobile from "~/components/pages/news/NewsDetailMobile.vue";

const component = useDevice().isDesktop ? Desktop : Mobile;
</script>

<template>
  <component :is="component" />
</template>

<script setup lang="ts">
// import useBase from "~/composables/useBase";
import Desktop from "~/components/pages/khuyen-mai/PromotionDetail.vue";
import Mobile from "~/components/pages/khuyen-mai/PromotionDetailMobile.vue";

const { isMobileOrTablet } = useDevice();
</script>
<template>
  <component :is="isMobileOrTablet ? Mobile : Desktop" />
</template>

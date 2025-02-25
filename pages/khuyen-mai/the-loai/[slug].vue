<script setup lang="ts">
// import useBase from "~/composables/useBase";
import Desktop from "~/components/pages/khuyen-mai/ListPromotion.vue";
import Mobile from "~/components/pages/khuyen-mai/ListPromotionMobile.vue";

const { isMobileOrTablet } = useDevice();
</script>
<template>
  <component :is="isMobileOrTablet ? Mobile : Desktop" />
</template>

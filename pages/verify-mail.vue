<script setup lang="ts">
import Mobile from "~/components/pages/account/verify-email/Mobile.vue";

definePageMeta({
  layout: "full-mobile",
  middleware: [
    function (_to) {
      const { isMobileOrTablet } = useDevice();

      if (!_to.query.token) {
        return navigateTo(APP_PATH.HOME, { replace: true });
      }

      if (isMobileOrTablet) {
        return;
      }

      return navigateTo(
        {
          path: APP_PATH.PROFILE,
          query: { token: _to.query.token },
        },
        { replace: true },
      );
    },
  ],
});

const { isMobileOrTablet } = useDevice();
</script>
<template>
  <Mobile v-if="isMobileOrTablet" />
</template>

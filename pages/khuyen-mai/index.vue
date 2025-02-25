<script lang="ts" setup>
definePageMeta({
  middleware: function (to) {
    if (to.name === BaseUrlEnum.PROMOTION) {
      return navigateTo(APP_PATH.PROMOTION_CATEGORY, { replace: true });
    }
  },
});
</script>

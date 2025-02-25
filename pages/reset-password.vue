<script setup lang="ts">
definePageMeta({
  middleware: [
    function (_to) {
      return navigateTo(
        {
          path: APP_PATH.HOME,
          query: { token: _to.query.token, popup: DialogTypeEnum.RESET_PASSWORD },
        },
        { replace: true },
      );
    },
  ],
});
</script>

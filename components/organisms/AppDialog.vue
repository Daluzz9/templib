<script setup lang="ts">
const route = useRoute();
const { isLoggedIn } = useCurrentUser();
const authDialogController = useDialog();

onMounted(() => {
  const dialogType = route.query.popup as DialogTypeEnum;

  if (
    [
      DialogTypeEnum.LOGIN,
      DialogTypeEnum.REGISTER,
      DialogTypeEnum.FORGOT_PASSWORD,
      DialogTypeEnum.RESET_PASSWORD,
    ].includes(dialogType)
  ) {
    if (isLoggedIn.value) {
      navigateTo({ query: { ...route.query, popup: undefined } });
    } else {
      authDialogController.openDialog(dialogType);
    }
  }
});
</script>

<template>
  <AuthDialog v-if="authDialogController.isOpen.value" :controller="authDialogController" />
</template>

<script setup>
const authDialogController = useDialog();
</script>
<template>
  <div class="flex gap-[6px]">
    <Button
      class="h-[32px] w-[90px] rounded-[6px] font-bold capitalize"
      @click="authDialogController.openDialog(DialogTypeEnum.LOGIN)"
    >
      Đăng Nhập
    </Button>
    <Button
      class="h-[32px] w-[90px] rounded-[6px] font-bold capitalize"
      variant="secondary"
      @click="authDialogController.openDialog(DialogTypeEnum.REGISTER)"
    >
      Đăng Ký
    </Button>
  </div>

  <AuthDialog v-if="authDialogController.isOpen.value" :controller="authDialogController" />
</template>

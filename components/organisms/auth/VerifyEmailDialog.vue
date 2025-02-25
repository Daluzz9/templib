<script lang="ts" setup>
const props = defineProps({
  controller: {
    type: Object as PropType<IUseDialog>,
    required: true,
  },
  description: {
    type: String,
    default: undefined,
  },
  icon: {
    type: String,
    default: undefined,
  },
  status: {
    type: String as PropType<VerifyEmailInfoStatusEnum>,
    default: VerifyEmailInfoStatusEnum.SUCCESS,
  },
});

const closeDialog = () => {
  props.controller.closeDialog();
  navigateTo(APP_PATH.PROFILE);
};
</script>
<template>
  <Dialog :controller="controller" :type="DialogTypeEnum.VERIFY_EMAIL">
    <DialogTrigger as-child>
      <slot name="trigger" />
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle class="text-primary">Xác Nhận Email</DialogTitle>
      </DialogHeader>
      <DialogBody class="flex flex-col items-center justify-center gap-4">
        <Image :src="icon" width="120px" />

        <div class="mx-auto w-full bg-custom-gradient-popup-verify-email p-3">
          <p class="text-center text-sm text-primary">{{ description }}</p>
        </div>

        <Button v-if="status == 'success'" class="h-12 w-full text-base font-bold" @click="navigateTo(APP_PATH.HOME)">
          Về Trang Chủ
        </Button>
        <Button v-else class="h-12 w-full text-base font-bold" @click="closeDialog()"> Xác Thực Lại </Button>
      </DialogBody>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import RegisterForm from "./RegisterForm.vue";

const emits = defineEmits(["register", "login"]);
type IProps = {
  controller: IUseDialog;
};
const props = defineProps<IProps>();
const router = useRouter();
const route = useRoute();

const authType = ref<DialogTypeEnum>(props.controller.data.value as DialogTypeEnum);

watch(
  authType,
  (type) => {
    router.push({
      query: { ...route.query, popup: type },
    });
  },
  {
    immediate: true,
  },
);
</script>

<template>
  <Dialog v-if="authType !== undefined" :controller="controller" :type="DialogTypeEnum.AUTH">
    <DialogContent>
      <LoginForm
        v-if="authType === DialogTypeEnum.LOGIN"
        @open-register="authType = DialogTypeEnum.REGISTER"
        @open-forgot-password="authType = DialogTypeEnum.FORGOT_PASSWORD"
        @succeed="
          controller.closeDialog();
          emits('login');
        "
      />

      <RegisterForm
        v-else-if="authType === DialogTypeEnum.REGISTER"
        @open-login="authType = DialogTypeEnum.LOGIN"
        @succeed="
          controller.closeDialog();
          emits('register');
        "
      />

      <ForgotPasswordForm v-else-if="authType === DialogTypeEnum.FORGOT_PASSWORD" @succeed="controller.closeDialog()" />

      <ResetPasswordForm v-else-if="authType === DialogTypeEnum.RESET_PASSWORD" @succeed="controller.closeDialog()" />
    </DialogContent>
  </Dialog>
</template>

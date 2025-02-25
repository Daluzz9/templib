<script setup lang="ts">
type IForgotPasswordForm = IForgotPasswordBody;
const emits = defineEmits(["succeed"]);

const { submitForgotPassword, isSubmitForgotPassProcessing, forgotPasswordValidationSchema } = useForgotPassword();
const onSubmit = async (formValue: IForgotPasswordForm) => {
  const hasSucceeded = await submitForgotPassword(formValue);
  if (hasSucceeded) emits("succeed");
};

onMounted(() => {
  autoFocusForm("#forgotPasswordForm");
});
</script>

<template>
  <Form v-slot="{ handleSubmit, values }" as="" keep-values :validation-schema="forgotPasswordValidationSchema">
    <DialogHeader>
      <DialogTitle>Quên mật khẩu</DialogTitle>
    </DialogHeader>

    <DialogBody>
      <form id="forgotPasswordForm" class="flex flex-col gap-2" @submit="handleSubmit($event, onSubmit as any)">
        <FormField v-slot="{ componentField }" name="email">
          <FormItem>
            <FormLabel class="text-label">Email</FormLabel>
            <FormControl>
              <InputText :name="componentField.name" type="email" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <div class="flex items-center justify-between text-[12px] font-normal text-neutral-300">
          Nếu bạn gặp bất kỳ vấn đề gì khi đăng nhập, vui lòng liên hệ CSKH 24/7 để được hỗ trợ.
        </div>
      </form>

      <div>
        <Button
          :is-loading="isSubmitForgotPassProcessing"
          type="submit"
          form="forgotPasswordForm"
          class="h-12 w-full"
          formnovalidate
          :disabled="isSubmitForgotPassProcessing || !values.email"
        >
          Xác nhận</Button
        >
      </div>
    </DialogBody>
  </Form>
</template>

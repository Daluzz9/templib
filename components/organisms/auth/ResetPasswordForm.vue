<script setup lang="ts">
type IResetPasswordForm = Omit<IResetPasswordBody, "token">;

const emits = defineEmits(["succeed"]);
const route = useRoute();
const router = useRouter();
const { submitResetPassword, isSubmitResetPasswordLoading, resetPasswordValidationSchema } = useResetPassword();

const onSubmit = async (resetPasswordForm: IResetPasswordForm) => {
  const isSucceeded = await submitResetPassword({ ...resetPasswordForm, token: route.query.token as string });
  if (isSucceeded) {
    await router.replace({
      query: {
        ...route.query,
        token: undefined,
      },
    });
    emits("succeed");
  }
};
</script>

<template>
  <!-- <p @click="">test</p> -->
  <Form v-slot="{ handleSubmit, values }" as="" keep-values :validation-schema="resetPasswordValidationSchema">
    <DialogHeader>
      <DialogTitle>Đổi mật khẩu</DialogTitle>
    </DialogHeader>

    <DialogBody>
      <form id="resetPasswordForm" @submit="handleSubmit($event, onSubmit as any)">
        <div class="flex flex-col gap-3">
          <FormField v-slot="{ componentField }" name="password">
            <FormItem>
              <FormLabel>Nhập mật khẩu mới</FormLabel>
              <FormControl>
                <InputText
                  :name="componentField.name"
                  type="password"
                  :max-length="validate.password.max"
                  placeholder="Nhập từ 6-32 ký tự"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="confirmPassword">
            <FormItem>
              <FormLabel>Nhập lại mật khẩu mới</FormLabel>
              <FormControl>
                <InputText
                  :name="componentField.name"
                  type="password"
                  :max-length="validate.password.max"
                  placeholder="Nhập từ 6-32 ký tự"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
      </form>

      <div>
        <Button
          :is-loading="isSubmitResetPasswordLoading"
          type="submit"
          form="resetPasswordForm"
          class="h-12 w-full"
          :disabled="isSubmitResetPasswordLoading || !values.password || !values.confirmPassword"
        >
          Xác Nhận
        </Button>
      </div>
    </DialogBody>
  </Form>
</template>

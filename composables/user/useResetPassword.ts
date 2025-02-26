export const useResetPassword = () => {
  const { $userService } = useNuxtApp();
  const { createToast } = useToast();

  const isSubmitResetPasswordLoading = ref<boolean>(false);

  const resetPasswordFormSchema = createSchemaValidationBuilder().buildConfirmPasswordSchema();
  const resetPasswordValidationSchema = toTypedSchema(resetPasswordFormSchema);

  const submitResetPassword = async (resetPasswordBody: IResetPasswordBody): Promise<boolean> => {
    let hasSucceeded = false;
    isSubmitResetPasswordLoading.value = true;

    try {
      await $userService.resetPassword(resetPasswordBody);

      createToast({
        description: "Thay đổi mật khẩu thành công.",
      });

      hasSucceeded = true;
    } catch (error: unknown) {
      createToast({
        variant: "destructive",
        description: (error as INuxtCustomError).message,
      });
    } finally {
      isSubmitResetPasswordLoading.value = false;
    }

    return hasSucceeded;
  };

  return {
    submitResetPassword,
    isSubmitResetPasswordLoading,
    resetPasswordValidationSchema,
  };
};

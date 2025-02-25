const registerValidationSchema = toTypedSchema(
  createSchemaValidationBuilder().buildUsernameSchema().buildPasswordSchema().buildPhoneSchema().build(),
);

export const useRegister = () => {
  const { $userService } = useNuxtApp();
  const route = useRoute();

  // MKT tracking register action
  const { pushToDataLayer } = useDataLayer();
  const { currentUser } = useCurrentUser();
  const { createToast } = useToast();

  const { resumeIntervalRefreshUserInfo } = useRefresh();
  const { initSystemData } = useSystemDataHandler();

  const isRegisterProcessing = ref<boolean>(false);

  const registerUser = async (
    registerBody: IRegisterBody,
  ): Promise<{
    isSucceeded: boolean;
    isUsernameExist: boolean;
  }> => {
    pushToDataLayer(GmtTrackingEventEnum.FORM_SUBMITTED, IUserActionsType.REGISTER);
    isRegisterProcessing.value = true;

    try {
      // get query back from loyalty feature
      const res = await $userService.registerUser({
        ...registerBody,
        back: (route.query.back as string) || undefined,
      });

      if (res.status !== ResponseStatusEnum.OK) {
        createToast({
          variant: "destructive",
          description: res.message || createSystemErrorMessage("URU"),
        });
      }

      currentUser.value = res.data[0];

      resumeIntervalRefreshUserInfo();
      await initSystemData();

      if (res.data[0].redirect_url) {
        navigateTo(res.data[0].redirect_url, { external: true });
      }

      createToast({
        description: res.message || "Tạo tài khoản thành công!",
      });

      return {
        isSucceeded: true,
        isUsernameExist: false,
      };
    } catch (error) {
      // User existed or whitelist issue will response code 400
      // User name is same existed fullname is response code 409
      const expectedErrorCodes = [400, 409];
      const err = error as INuxtCustomError;
      if (expectedErrorCodes.includes(err.statusCode)) {
        return {
          isSucceeded: false,
          isUsernameExist: true,
        };
      }

      // TODO Meidai: update using logger service in not expected error case
      return {
        isSucceeded: false,
        isUsernameExist: false,
      };
    } finally {
      isRegisterProcessing.value = false;
    }
  };

  return {
    registerUser,
    isRegisterProcessing,
    registerValidationSchema,
  };
};

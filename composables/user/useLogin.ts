export const useLogin = () => {
  const { $userService } = useNuxtApp();

  const { currentUser } = useCurrentUser();
  const { createToast } = useToast();
  const { pushToDataLayer } = useDataLayer();

  const { resumeIntervalRefreshUserInfo } = useRefresh();
  const { initSystemData } = useSystemDataHandler();
  const route = useRoute();

  const isLogInProcessing = ref<boolean>(false);

  const loginFormSchema = createSchemaValidationBuilder().buildUsernameSchema().buildPasswordSchema().build();
  const loginValidationSchema = toTypedSchema(loginFormSchema);

  const logIn = async (loginBody: ILoginBody): Promise<{ isSucceeded: boolean }> => {
    // MKT tracking login action
    pushToDataLayer(GmtTrackingEventEnum.FORM_SUBMITTED, IUserActionsType.LOGIN);

    isLogInProcessing.value = true;

    try {
      const res = await $userService.logIn({
        ...loginBody,
        back: (route.query.back as string) || undefined,
      });

      if (res.status !== ResponseStatusEnum.OK) {
        createToast({
          variant: "destructive",
          description: res.message,
        });
      }

      currentUser.value = res.data[0];
      resumeIntervalRefreshUserInfo();
      await initSystemData();

      if (res.data[0].redirect_url) {
        navigateTo(res.data[0].redirect_url, { external: true });
      }

      createToast({
        description: res.message || "Đăng nhập thành công!",
      });

      // Redirect to the page that user wants to open before login. In case the user clicks the button from the promotion page.
      // If there is no page to open, redirect to the home page.
      const openUrl = useRoute().query.openUrl as string;
      if (openUrl) {
        navigateTo(openUrl, { replace: true });
      }

      return {
        isSucceeded: true,
      };
    } catch {
      // TODO Meidai: update using logger service in not expected error case
      return {
        isSucceeded: false,
      };
    } finally {
      isLogInProcessing.value = false;
    }
  };

  return {
    logIn,
    isLogInProcessing,
    loginValidationSchema,
  };
};

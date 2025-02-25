export const useLogout = () => {
  const { $userService } = useNuxtApp();
  const appStore = useAppStore();
  const { currentUser } = useCurrentUser();
  const { createToast } = useToast();
  const { pauseIntervalRefreshUserInfo } = useRefresh();

  const isLogoutProcessing = ref<boolean>(false);
  const logOutError = ref<INuxtCustomError | undefined>();

  const logout = async (): Promise<void> => {
    isLogoutProcessing.value = true;
    logOutError.value = undefined;

    try {
      await $userService.logOut();
      pauseIntervalRefreshUserInfo();
      // reset store

      await navigateTo(APP_PATH.HOME);
      await nextTick();
      currentUser.value = undefined;
      appStore.systemPlan = undefined;
      appStore.systemDepositPayment = undefined;
      appStore.systemPhoneCardPayment = undefined;

      createToast({
        description: "Đăng xuất thành công!",
      });
    } catch (error) {
      logOutError.value = error as INuxtCustomError;
      createToast({
        variant: "destructive",
        description: "Đăng xuất không thành công",
      });
    } finally {
      isLogoutProcessing.value = false;
    }
  };

  return {
    logout,
    isLogoutProcessing,
    logOutError,
  };
};

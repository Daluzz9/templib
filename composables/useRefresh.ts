const REFRESH_INTERVAL = 20000;

// This composable use in SPA only
export const useRefresh = createSharedComposable(() => {
  const { $systemService } = useNuxtApp();
  const { createToast } = useToast();
  const device = useDevice();
  const { closeSidebarMenu } = useSidebarMenu();

  const isLoading = ref<boolean>(false);

  const { currentUser, isLoggedIn } = useCurrentUser();

  const refreshUserInfo = async (): Promise<boolean> => {
    try {
      isLoading.value = true;
      const data = await $systemService.refreshUserInfo({
        bypassErrorToast: !!currentUser,
      });
      if (data) {
        currentUser.value = data;
      }
      return true;
    } catch (error: unknown) {
      const statusCode = (error as INuxtCustomError).statusCode;
      if (statusCode === 401) {
        createToast({
          variant: "destructive",
          description: "Phiên đăng nhập đã hết hạn hoặc được đăng nhập ở thiết bị khác.",
        });

        currentUser.value = undefined;
        // close sheet right menu
        if (device.isMobileOrTablet) {
          closeSidebarMenu();
        }
        // Redirect to home page if not in home page
        if (useRoute().path !== APP_PATH.HOME) {
          navigateTo(APP_PATH.HOME, { replace: true });
        }
      }
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const {
    pause: pauseIntervalRefreshUserInfo,
    resume: resumeIntervalRefreshUserInfo,
    isActive: isActiveIntervalRefreshUserInfo,
  } = useIntervalFn(
    async () => {
      if (isLoading.value) {
        return;
      }

      if (isLoggedIn.value) {
        const hasRefreshToken = await refreshUserInfo();

        if (!hasRefreshToken) {
          pauseIntervalRefreshUserInfo();
        }
      }
    },
    useToNumber(REFRESH_INTERVAL).value,
    { immediate: false },
  );

  return {
    isLoading,
    isLoggedIn,
    refreshUserInfo,
    resumeIntervalRefreshUserInfo,
    pauseIntervalRefreshUserInfo,
    isActiveIntervalRefreshUserInfo,
  };
});

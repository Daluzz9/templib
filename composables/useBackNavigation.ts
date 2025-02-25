export const useBackNavigation = () => {
  const router = useRouter();
  const unableToBackUrls = [MobileBaseUrlEnum.VERIFY_EMAIL];
  const handlePageBack = () => {
    const previousPage = router.options.history.state.back;
    if (
      previousPage &&
      typeof previousPage === "string" &&
      unableToBackUrls.includes(previousPage as MobileBaseUrlEnum)
    ) {
      return router.back();
    }
    return navigateTo(APP_PATH.HOME);
  };

  return { handlePageBack };
};

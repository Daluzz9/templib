export const useBanner = () => {
  const { isLoggedIn } = useCurrentUser();
  const { $systemService } = useNuxtApp();
  const banners = useState<IBanner[]>("banner-list");

  const fetchBanners = async () => {
    try {
      if (banners.value) return banners.value;

      banners.value = await $systemService.getHeroBanners();
      return banners.value;
    } catch (e: unknown) {
      console.log(e);
    }
  };

  const handleSelect = (props: { banner?: IBanner; openLoginDialogFn?: () => void }) => {
    const { banner, openLoginDialogFn } = props;
    if (!banner?.api_url) return;

    const apiUrl = banner.api_url;

    if (apiUrl.includes("partnerprovider") && apiUrl.includes("partnergameid")) {
      openInNewTab(apiUrl);
      return;
    }

    if (apiUrl.includes("account")) {
      if (!isLoggedIn.value) {
        if (openLoginDialogFn) openLoginDialogFn();
        return;
      }
      navigateTo(apiUrl);
      return;
    }

    navigateTo(apiUrl);
  };
  return {
    fetchBanners,
    banners,
    handleSelect,
  };
};

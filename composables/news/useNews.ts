export const useNews = () => {
  const nuxt = useNuxtApp();
  const pageLimit: number = 7;
  const route = useRoute();

  const newsPosts = computed<INewsPost[]>(() => staticNewsResponse.value?.items || []);
  const totalItem = computed<number>(() => staticNewsResponse.value?.total || 0);
  const postHighlight = computed<INewsPost | undefined>(() => newsPosts.value?.[0]);
  const currentPage = ref<number>(Number(route.query.page) || 1);

  const createNewsDetailPath = (alias?: string) => {
    return `${APP_PATH.NEWS}/${alias ?? ""}`;
  };

  const onCategoryPageChanged = (page: number) => {
    currentPage.value = page;
    navigateTo({ path: route.path, query: { ...route.query, page: page } });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const {
    status,
    error,
    data: staticNewsResponse,
    refresh,
  } = useApi(useRoute().path + "getStaticNews", async () => {
    const alias = (route.params.slug as string) || NewsCategoryAliasEnum.ALL;
    const params: IStaticNewsParams = { page: currentPage.value, limit: pageLimit, alias };
    return nuxt.$staticPageService.getStaticNews(params);
  });

  watch(currentPage, () => {
    if (currentPage.value) {
      refresh();
    }
  });

  watch(error, () => {
    // TODO: handle error here
  });

  useHead({
    link: () => {
      const totalPage = staticNewsResponse.value?.total_page || 1;

      const dataPagePre = Math.max(currentPage.value - 1, 1);
      const dataPageNext = Math.min(currentPage.value + 1, totalPage);
      const linkPrev = currentPage.value === 1 ? "" : `${nuxt.$domainUrl}${route.path}?page=${dataPagePre}`;
      const linkNext = currentPage.value >= totalPage ? "" : `${nuxt.$domainUrl}${route.path}?page=${dataPageNext}`;

      const links = [];
      if (linkPrev) {
        links.push({ rel: "prev", href: linkPrev });
      }
      if (linkNext) {
        links.push({ rel: "next", href: linkNext });
      }
      return links;
    },
  });

  return {
    newsPosts,
    status,
    postHighlight,
    totalItem,
    currentPage,
    pageLimit,
    createNewsDetailPath,
    onCategoryPageChanged,
  };
};

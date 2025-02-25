export const useStaticAndNewsDetail = () => {
  const { $staticPageService, $domainUrl } = useNuxtApp();
  const route = useRoute();

  const currentPostAlias = computed<string | undefined>(() => {
    const pathsExcludeAll = postDetail.value?.paths?.filter((path) => path !== NewsCategoryAliasEnum.ALL);
    return pathsExcludeAll?.[0];
  });

  const {
    data: postDetail,
    error,
    status,
  } = useApi(`p:${route.params.alias}"get-detail-by-alias"`, async () => {
    const alias = route.params.alias as string;
    return $staticPageService.getDetailByAlias(alias);
  });

  watch(error, () => {
    // TODO: handle error here
  });

  useSeoMeta({
    title: () => postDetail.value?.meta_title || "",
    description: () => postDetail.value?.meta_description,
    keywords: () => postDetail.value?.meta_keywords, // TODO: remove keywords, ref: https://web.dev/learn/html/metadata/#keywords
    ogType: "website",
    ogTitle: () => postDetail.value?.meta_title,
    ogDescription: () => postDetail.value?.meta_description,
    ogImage: () => postDetail.value?.seo_img || "",
    ogUrl: () => `${$domainUrl}${route.path}`,
    twitterCard: "summary_large_image",
    twitterTitle: () => postDetail.value?.meta_title,
    twitterDescription: () => postDetail.value?.meta_description,
    twitterImage: () => postDetail.value?.seo_img || "",
  });

  return {
    status,
    postDetail,
    currentPostAlias,
  };
};

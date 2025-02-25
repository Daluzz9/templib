export default defineNuxtRouteMiddleware(async (_to) => {
  const { systemSeoByPage } = useSystemSeo(_to);

  useSeoMeta({
    title: () => systemSeoByPage.value.meta_title,
    description: () => systemSeoByPage.value.meta_description,
    keywords: () => systemSeoByPage.value.meta_keyword, // TODO: remove keywords, ref: https://web.dev/learn/html/metadata/#keywords
    ogType: "website",
    ogTitle: () => systemSeoByPage.value.meta_title,
    ogDescription: () => systemSeoByPage.value.meta_description,
    ogImage: () => systemSeoByPage.value.seo_img || "",
    ogUrl: () => systemSeoByPage.value.alias,
    twitterCard: "summary_large_image",
    twitterTitle: () => systemSeoByPage.value.meta_title,
    twitterDescription: () => systemSeoByPage.value.meta_description,
    twitterImage: () => systemSeoByPage.value.seo_img || "",
  });

  useHead({
    link: [{ rel: "canonical", href: () => systemSeoByPage.value.alias }],
  });
});

type IUseSystemSeo = ReturnType<typeof useRoute>;

export const useSystemSeo = (route: IUseSystemSeo) => {
  const nuxt = useNuxtApp();

  const { data, status, error } = useApi<ISystemSeoItem[]>("getSystemSeo", async () => {
    const res = await nuxt.$systemService.getSystemSeo();
    return res;
  });

  const systemSeo = computed<ISystemSeo>(() => {
    if (!data.value) return {};

    return data.value.reduce((acc, item) => {
      const { children, ...rest } = item;
      const newAcc = { ...acc, [`/${item.alias}`]: rest };
      if (!children) {
        return newAcc;
      }

      return children.reduce((childAcc, childItem) => {
        return { ...childAcc, [`/${childItem.alias}`]: childItem };
      }, newAcc);
    }, {});
  });

  const systemSeoByPage = computed<ISystemSeoItem>(() => {
    const page = route.query.page ? ` #${route.query.page}` : "";
    const dataByPath = systemSeo.value[route.path] || systemSeo.value["//"] || ({} as ISystemSeoItem);
    const dataByPaging = {
      meta_title: `${dataByPath.meta_title}${page}`,
      meta_description: `${dataByPath.meta_description}${page}`,
      alias: `${nuxt.$domainUrl}${route.path}${route.query.page ? `?page=${route.query.page}` : ""}`,
    };

    const urls = [BaseRouteNameEnum.NEWS_ALIAS];
    const isRemoveHeading = urls.some((url) => route.name?.toString()?.startsWith(url));

    if (!isRemoveHeading) {
      return { ...dataByPath, ...dataByPaging };
    }

    return {
      ...dataByPath,
      ...dataByPaging,
      content_title: dataByPath.content_title.replace(/<(h1|\/h1)>/g, ""),
      content_description: dataByPath.content_description.replace(/<(h2|\/h2)>/g, ""),
    };
  });

  return { systemSeo, systemSeoByPage, status, error };
};

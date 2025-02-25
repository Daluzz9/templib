import { _height } from "#tailwind-config/theme";
import type { IBreadcrumb } from "~/components/atomics/custom/breadcumb/type";

type ITabDetail = {
  icon: string;
  name: string;
  key: string;
  content?: string;
};
export const usePromotionByAlias = (alias: string) => {
  const { $systemService, $domainUrl } = useNuxtApp();

  const { isLoggedIn } = useCurrentUser();
  const currentRoute = useRoute();
  const authDialogController = useDialog(DialogTypeEnum.LOGIN);

  const { categories } = useCategoriesByAlias({ alias: CategoryAliasEnum.KHUYEN_MAI });

  const {
    data: promotionDetail,
    status,
    error,
  } = useAsyncData(currentRoute.fullPath + "events", () => $systemService.getPromotionByAlias(alias), {
    lazy: true,
    immediate: alias !== "vip",
  });

  const tabs = computed<ITabDetail[]>(() =>
    [
      {
        icon: "SvgoBonus",
        name: "Bảng Thưởng",
        key: "bonus",
        content: promotionDetail.value?.event_type?.includes("event") ? "bonus" : undefined,
      },
      {
        icon: "SvgoCondition",
        name: "Mô Tả",
        key: "description",
        content: promotionDetail.value?.content?.short_description,
      },
      {
        icon: "SvgoRule",
        name: "Thể Lệ",
        key: "rule",
        content: promotionDetail.value?.content?.rules,
      },
      {
        icon: "SvgoRule",
        name: "Cơ Cấu",
        key: "award_structure",
        content: promotionDetail.value?.content?.award_structure,
      },
      {
        icon: "SvgoCondition",
        name: "Điều Kiện",
        key: "condition",
        content: promotionDetail.value?.content?.term_condition,
      },
    ].filter((tab) => !!tab.content),
  );

  const breadcrumbs = computed<IBreadcrumb[]>(() => {
    const currentCategory = categories.value?.find((category) => category.alias === promotionDetail.value?.paths?.[0]);
    return [
      {
        label: "Khuyến mãi",
        url: APP_PATH.PROMOTION,
      },
      {
        label: currentCategory?.display_name || "Chi tiết",
        url: `${APP_PATH.PROMOTION_CATEGORY}/${currentCategory?.alias}`,
      },
      {
        label: promotionDetail.value?.event_name || "",
        url: currentRoute.path,
      },
    ];
  });

  const createNewDeposit = async () => {
    if (isLoggedIn.value) {
      navigateTo(promotionDetail.value?.content?.cta_navigation_link ?? APP_PATH.DEPOSIT_CODEPAY);
      return;
    }
    await navigateTo({
      query: { ...currentRoute.query, openUrl: promotionDetail.value?.content?.cta_navigation_link },
    });

    authDialogController.openDialog();
  };

  const generateCTA = computed(() => ({
    style: {
      width: promotionDetail.value?.content?.cta_width,
      height: promotionDetail.value?.content?.cta_height,
      backgroundColor: promotionDetail.value?.content.cta_background_color,
    },
    text: promotionDetail.value?.content?.cta_text,
  }));

  useSeoMeta({
    title: () => promotionDetail?.value?.seo?.meta_title || "",
    description: () => promotionDetail?.value?.seo?.meta_description,
    keywords: () => promotionDetail?.value?.seo?.meta_keyword, // TODO: remove keywords, ref: https://web.dev/learn/html/metadata/#keywords
    ogType: "website",
    ogTitle: () => promotionDetail?.value?.seo?.meta_title,
    ogDescription: () => promotionDetail?.value?.seo?.meta_description,
    ogImage: () => promotionDetail?.value?.seo?.img || "",
    ogUrl: () => `${$domainUrl}${currentRoute.path}`,
    twitterCard: "summary_large_image",
    twitterTitle: () => promotionDetail?.value?.seo?.meta_title,
    twitterDescription: () => promotionDetail?.value?.seo?.meta_description,
    twitterImage: () => promotionDetail?.value?.seo?.img || "",
  });

  return {
    status,
    error,
    promotionDetail,
    tabs,
    createNewDeposit,
    authDialogController,
    breadcrumbs,
    generateCTA,
  };
};

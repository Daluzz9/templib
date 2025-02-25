import type { IBreadcrumb } from "~/components/atomics/custom/breadcumb/type";
import OverviewContent from "./OverviewContent.vue";
import OverviewContentMobile from "./OverviewContentMobile.vue";
import RewardGuideContent from "./RewardGuideContent.vue";
import RuleContent from "./RuleContent.vue";
import RuleContentMobile from "./RuleContentMobile.vue";

export const breadcrumbs: IBreadcrumb[] = [
  {
    label: "Khuyến mãi",
    url: APP_PATH.PROMOTION,
  },
  {
    label: "VIP",
  },
];

export const createVipTabs = () => {
  const isDesktop = useDevice().isDesktop;
  return [
    {
      value: "overview",
      name: "Tổng quan",
      icon: isDesktop ? "overview.svg" : "",
      content: isDesktop ? OverviewContent : OverviewContentMobile,
    },
    {
      value: "rule",
      name: "Thể lệ",
      icon: isDesktop ? "ticket.svg" : "",
      content: isDesktop ? RuleContent : RuleContentMobile,
    },
    {
      value: "guide",
      name: "Cách nhận thưởng VIP",
      icon: isDesktop ? "reward.svg" : "",
      content: RewardGuideContent,
    },
  ];
};
type IRewardGuide = {
  leftContent: {
    label: string;
    icon?: string;
  }[];
  description: string;
};
export const getRewardGuide = (): IRewardGuide[] => {
  const isDesktop = useDevice().isDesktop;
  const brandName = useRuntimeConfig().public.BRAND_NAME;
  return [
    {
      leftContent: isDesktop ? [{ label: "Vip 1", icon: "/vip/1.webp" }] : [{ label: "Vip 1" }],
      description: `${brandName} duyệt lên VIP 1 cho tài khoản đăng ký mới.`,
    },
    {
      leftContent: isDesktop
        ? [
            { label: "Vip 2", icon: "/vip/2.webp" },
            { label: "Vip 3", icon: "/vip/3.webp" },
            { label: "Vip 4", icon: "/vip/4.webp" },
            { label: "Vip 5", icon: "/vip/5.webp" },
          ]
        : [{ label: "Vip 2 - Vip 5" }],
      description:
        "Xét duyệt lên cấp VIP vào ngày đầu tiên của mỗi tháng.<br/>Xét duyệt VIP dựa trên số tiền nạp hợp lệ của thành viên ở mỗi tháng.<br/>Tiền nạp hợp lệ được tính là Số tiền nạp đã trải qua 01 vòng cược.",
    },
    {
      leftContent: [{ label: "Thưởng lên hạng" }],
      description:
        "Thành viên được nhận tiền thưởng với Hạng VIP tương ứng vào ngày đầu tiên mỗi tháng.<br/>Tiền thưởng VIP phải trải qua 01 vòng cược trước khi rút tiền.",
    },
    {
      leftContent: [{ label: "Điều kiện chung" }],
      description: `Chương trình VIP sẽ càng ngày càng có nhiều ưu đãi cho quý khách hàng thân thiết trong tương lai.<br/>${brandName} có quyền thay đổi, bổ sung, hoặc bất kỳ quyết định nào tới chương trình hạng VIP mà không cần báo trước.<br/>Chương trình áp dụng điều kiện, điều khoản khuyến mãi chung của nhà cái DA88.`,
    },
  ];
};

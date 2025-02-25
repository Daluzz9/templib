export const getFooterNavigationPC = () => {
  const config = useRuntimeConfig().public;

  return [
    {
      title: "Thể thao",
      subCategories: [
        { title: "Lịch thi đấu", link: APP_PATH.MATCH_SCHEDULE },
        { title: "Cược thể thao", link: APP_PATH.SPORT },
      ],
    },
    {
      title: "Danh Mục Trò chơi",
      subCategories: [
        { title: "Bắn cá", link: APP_PATH.BAN_CA },
        { title: "Slots", link: APP_PATH.SLOTS_GAME },
        { title: "Nổ hũ", link: APP_PATH.NO_HU },
        { title: "Lô đề", link: APP_PATH.LO_DE },
        { title: "Table games", link: APP_PATH.TABLE_GAME },
        { title: "Quay số", link: APP_PATH.QUAY_SO },
        { title: "Game nhanh", link: APP_PATH.QUICK_GAMES },
        { title: "Game bài", link: APP_PATH.GAME_BAI },
      ],
    },
    {
      title: "Về chúng tôi",
      subCategories: [
        { title: `Giới thiệu ${config.BRAND_NAME}`, link: `${APP_PATH.INTRODUCTION}` },
        { title: "Quy định chung", link: `${APP_PATH.GENERAL_RULE}` },
        { title: "Điều kiện - Điều khoản", link: `${APP_PATH.TERM_CONDITION}` },
        { title: "Chính sách bảo mật", link: `${APP_PATH.PRIVACY_POLICY}` },
      ],
    },
    {
      title: "Thông tin",
      subCategories: [
        { title: "Khuyến mãi /Sự kiện", link: APP_PATH.PROMOTION },
        { title: "Tin tức", link: APP_PATH.NEWS },
      ],
    },
  ];
};

export const getFooterNavigationMB = () => {
  return [
    {
      title: "Về chúng tôi",
      subCategories: [
        { title: "Giới thiệu", link: `${APP_PATH.INTRODUCTION}`, icon: "book.svg", newTab: false },
        { title: "Quy định", link: `${APP_PATH.GENERAL_RULE}`, icon: "hammer.svg", newTab: false },
        { title: "Bảo mật", link: `${APP_PATH.PRIVACY_POLICY}`, icon: "shield.svg", newTab: false },
        { title: "Hướng dẫn", link: APP_PATH.GUIDE, icon: "folder.svg", newTab: false },
        { title: "Tin tức", link: APP_PATH.NEWS, icon: "news.svg", newTab: false },
      ],
    },
  ];
};

export const getFooterContent = () => {
  const config = useRuntimeConfig().public;

  return {
    VIEW_MORE: "xem thêm",
    COPY_RIGHT: `Copyright © 2024 Powered By ${config.BRAND_NAME} All Rights Reserved.`,
  };
};

export const providerImgList = [
  "provider/b52.webp,",
  "provider/rikvip.webp,",
  "provider/mglive.webp,",
  "provider/sexygaming.webp,",
  "provider/ebet.webp,",
  "provider/yeebet.webp,",
  "provider/sagaming.webp,",
  "provider/microgaming.webp,",
  "provider/hdgaming.webp,",
];

export const gamblingRegulationLogos = ["18plus.webp", "egaming.webp", "mga.webp"];

export type IFooterMobileItem = {
  name: string;
  url: string;
  activeUrl?: string;
  icon: string;
};

export const mbNavigationItems: IFooterMobileItem[] = [
  {
    name: "Trang Chủ",
    url: APP_PATH.HOME,
    icon: "footer/home.webp",
  },
  {
    name: "Khuyến Mãi",
    url: APP_PATH.PROMOTION,
    icon: "footer/promotion.webp",
  },
  {
    name: "Thể Thao",
    url: APP_PATH.SPORT,
    activeUrl: APP_PATH.SPORT,
    icon: "footer/the-thao.webp",
  },
  {
    name: "Cổng Game",
    url: APP_PATH.GAME_BAI,
    activeUrl: APP_PATH.GAME,
    icon: "footer/game.webp",
  },
  {
    name: "Live Casino",
    url: APP_PATH.CASINO,
    activeUrl: APP_PATH.CASINO,
    icon: "footer/casino.webp",
  },
  {
    name: "Quay Số",
    url: APP_PATH.QUAY_SO,
    activeUrl: APP_PATH.QUAY_SO,
    icon: "footer/quay-so.webp",
  },
];

import {
  LazySvgoBank,
  LazySvgoBitcoin,
  LazySvgoCodepay,
  LazySvgoMomo,
  LazySvgoP2p,
  LazySvgoTheCao,
  LazySvgoViettelpay,
} from "#components";

export type IWidgetItem = {
  featuredImg: string;
  alt: string;
  title: string;
  options: {
    tooltip: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon?: any;
    img?: string;
    url: string;
  }[];
};

export const widgetItems: IWidgetItem[] = [
  {
    featuredImg: "shield.webp",
    alt: "Nạp tiền",
    title: "Nạp tiền chỉ 2 phút",
    options: [
      {
        tooltip: "CodePay",
        icon: LazySvgoCodepay,
        url: APP_PATH.DEPOSIT_CODEPAY,
      },
      {
        tooltip: "P2P",
        icon: LazySvgoP2p,
        url: APP_PATH.TRADING_P2P,
      },
      {
        tooltip: "Tiền Ảo",
        icon: LazySvgoBitcoin,
        url: APP_PATH.DEPOSIT_CRYPTO,
      },
      {
        tooltip: "Momo",
        icon: LazySvgoMomo,
        url: APP_PATH.DEPOSIT_MOMO,
      },
      {
        tooltip: "Viettel Money",
        icon: LazySvgoViettelpay,
        url: APP_PATH.DEPOSIT_VIETTEL,
      },
      {
        tooltip: "Thẻ Cào",
        icon: LazySvgoTheCao,
        url: APP_PATH.DEPOSIT_CARD,
      },
    ],
  },
  {
    featuredImg: "clock.webp",
    alt: "Rút Tiền",
    title: "Rút tiền chỉ 5 phút",
    options: [
      {
        tooltip: "Ngân Hàng",
        icon: LazySvgoBank,
        url: APP_PATH.WITHDRAW_BANK,
      },
      {
        tooltip: "P2P",
        icon: LazySvgoP2p,
        url: APP_PATH.TRADING_P2P,
      },
      {
        tooltip: "Tiền Ảo",
        icon: LazySvgoBitcoin,
        url: APP_PATH.WITHDRAW_CRYPTO,
      },
      {
        tooltip: "Thẻ Cào",
        icon: LazySvgoTheCao,
        url: APP_PATH.WITHDRAW_CARD,
      },
    ],
  },
];

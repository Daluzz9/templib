import { SvgoBank, SvgoDollar, SvgoHeadphone, SvgoP2p, SvgoReward, SvgoTransaction, SvgoUser } from "#components";

export type IMenuAccountOverview = {
  name: string;
  icon: string;
  link: string;
  newTab?: boolean;
};

export const getMenuAccountOverview = () => {
  const config = useRuntimeConfig().public;

  // TODO thay icon bang svg
  const menuAccountOverview: IMenuAccountOverview[] = [
    {
      name: "Quản lý tài khoản",
      icon: SvgoUser,
      link: APP_PATH.PROFILE,
    },
    {
      name: "Quản lý ngân hàng",
      icon: SvgoBank,
      link: APP_PATH.BANK,
    },
    {
      name: "Giao dịch P2P",
      icon: SvgoP2p,
      link: APP_PATH.TRADING_P2P,
    },
    {
      name: "Lịch sử giao dịch",
      icon: SvgoTransaction,
      link: APP_PATH.TRANSACTION_HISTORY,
    },
    {
      name: "Lịch sử cá cược",
      icon: SvgoDollar,
      link: APP_PATH.BET_HISTORY,
    },
    {
      name: "Tiền thưởng",
      icon: SvgoReward,
      link: APP_PATH.BONUS,
    },
    {
      name: "Live chat 24/7",
      icon: SvgoHeadphone,
      link: `https://secure.livechatinc.com/licence/${config.LIVE_CHAT_ID}/v2/open_chat.cgi`,
      newTab: true,
    },
  ];

  return menuAccountOverview;
};

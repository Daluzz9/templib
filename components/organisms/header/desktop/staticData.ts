import { APP_PATH } from "@/constants/path";

export type INavItem = {
  label: string;
  icon: string;
  path: (typeof APP_PATH)[keyof typeof APP_PATH];
};

export const navList: INavItem[] = [
  {
    label: "Thể Thao",
    icon: "SvgoBall",
    path: APP_PATH.SPORT,
  },
  {
    label: "Live Casino",
    icon: "SvgoPokerChip",
    path: APP_PATH.SANH_CASINO,
  },
  {
    label: "Quay Số",
    icon: "SvgoBall8",
    path: APP_PATH.QUAY_SO,
  },
  {
    label: "Nổ hũ",
    icon: "SvgoMoneyBag",
    path: APP_PATH.NO_HU,
  },
  {
    label: "Game Bài",
    icon: "SvgoSpade",
    path: APP_PATH.GAME_BAI,
  },
  {
    label: "Table Games",
    icon: "SvgoPokerTable",
    path: APP_PATH.TABLE_GAME,
  },
  {
    label: "Lô Đề",
    icon: "SvgoBallCage",
    path: APP_PATH.LO_DE,
  },
  {
    label: "Bắn Cá",
    icon: "SvgoFish",
    path: APP_PATH.BAN_CA,
  },
  {
    label: "Slots",
    icon: "SvgoJackpot",
    path: APP_PATH.SLOTS_GAME,
  },
  {
    label: "Game Nhanh",
    icon: "SvgoRocket",
    path: APP_PATH.QUICK_GAMES,
  },
  {
    label: "Đá Gà",
    icon: "SvgoChicken",
    path: APP_PATH.DA_GA,
  },
];

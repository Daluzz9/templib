import type { ISortOption } from "~/components/organisms/games/GameSorters.vue";

export type IGameSortOption = { value: GameSortByEnum; labelPC: string; labelMB: string; queryUrl?: string };

export enum GameSortByEnum {
  DEFAULT = "",
  TOP_BET = "TOP_BET",
  TOP_USER_BET = "TOP_USER_BET",
  HOT_GAME = "HOT_GAME",
  NEW_GAME = "NEW_GAME",
  FOR_NEWBER = "FOR_NEWBER",
}

const gameSortByQueryUrls: Record<GameSortByEnum, string | undefined> = {
  [GameSortByEnum.DEFAULT]: undefined,
  [GameSortByEnum.TOP_BET]: "cuoc-nhieu-nhat",
  [GameSortByEnum.TOP_USER_BET]: "ua-chuong-nhat",
  [GameSortByEnum.HOT_GAME]: "game-hot",
  [GameSortByEnum.NEW_GAME]: "game-moi-nhat",
  [GameSortByEnum.FOR_NEWBER]: "game-cho-nguoi-moi",
};

export const gameSortOptions: IGameSortOption[] = [
  { value: GameSortByEnum.DEFAULT, labelPC: "Mặc Định", labelMB: "Mặc Định" },
  {
    value: GameSortByEnum.TOP_BET,
    labelPC: "Cược nhiều",
    labelMB: "Cược nhiều",
  },
  {
    value: GameSortByEnum.TOP_USER_BET,
    labelPC: "Nhiều người chơi",
    labelMB: "Ưa chuộng",
  },
  {
    value: GameSortByEnum.HOT_GAME,
    labelPC: "Game Hot",
    labelMB: "Game Hot",
  },
  {
    value: GameSortByEnum.NEW_GAME,
    labelPC: "Game mới",
    labelMB: "Mới ra mắt",
  },
  {
    value: GameSortByEnum.FOR_NEWBER,
    labelPC: "Người mới",
    labelMB: "Mới ra mắt",
  },
].map((option) => ({ ...option, queryUrl: gameSortByQueryUrls[option.value] }));

export const getSortByValue = (queryUrl?: string): GameSortByEnum | undefined => {
  return gameSortOptions.find((el) => el.queryUrl === queryUrl)?.value;
};

export const gameSortOptionsPC: ISortOption[] = gameSortOptions.map((option) => ({
  value: option.value,
  label: option.labelPC,
  queryUrl: option.queryUrl,
}));

export const gameSortOptionsMB: ISortOption[] = gameSortOptions.map((option) => ({
  value: option.value,
  label: option.labelMB,
  queryUrl: option.queryUrl,
}));

export const gameCategories: IGameRate[] = [
  {
    label: "Thể thao",
    key: "sport",
    rates: [],
  },
  {
    label: "E-Sports",
    key: "e_sport",
    rates: [],
  },
  {
    label: "Thể thao Ảo",
    key: "virtual_sport",
    rates: [],
  },
  {
    label: "Live Casino",
    key: "casino",
    rates: [],
  },
  {
    label: "Nổ hũ",
    key: "no_hu",
    rates: [],
  },
  {
    label: "Keno (Techplay)",
    key: "keno",
    rates: [],
  },
  {
    label: "Lô đề (Techplay)",
    key: "lode",
    rates: [],
  },
  {
    label: "Game bài",
    key: "game_bai",
    rates: [],
  },
  {
    label: "Bắn cá (Techplay)",
    key: "fishing_no_hu",
    rates: [],
  },
  {
    label: "Đá gà (WS168, GA28)",
    key: "da_ga",
    rates: [],
  },
];

export const ALL_PROVIDER_QUERY = "all";

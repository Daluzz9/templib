export type IFeaturedAlias = {
  label: string;
  imagePC: string;
  imageMB: string;
  path: string;
  alias?: GameAliasEnum;
};

const featuredAliases: IFeaturedAlias[] = [
  {
    label: "Thể Thao",
    imagePC: "games/featured-aliases/the-thao-pc.webp",
    imageMB: "games/featured-aliases/the-thao-mb.webp",
    path: APP_PATH.SPORT,
  },
  {
    label: "Live Casino",
    imagePC: "games/featured-aliases/live-casino-pc.webp",
    imageMB: "games/featured-aliases/live-casino-mb.webp",
    path: APP_PATH.CASINO,
  },
  {
    label: "Nổ Hũ",
    imagePC: "games/featured-aliases/no-hu-pc.webp",
    imageMB: "games/featured-aliases/no-hu-mb.webp",
    path: APP_PATH.NO_HU,
    alias: GameAliasEnum.NO_HU,
  },
  {
    label: "Game Bài",
    imagePC: "games/featured-aliases/game-bai-pc.webp",
    imageMB: "games/featured-aliases/game-bai-mb.webp",
    path: APP_PATH.GAME_BAI,
  },
  {
    label: "Table Games",
    imagePC: "games/featured-aliases/table-games.webp",
    imageMB: "games/featured-aliases/table-games.webp",
    path: APP_PATH.TABLE_GAME,
    alias: GameAliasEnum.TABLE_GAME,
  },
  {
    label: "Lô Đề",
    imagePC: "games/featured-aliases/lo-de.webp",
    imageMB: "games/featured-aliases/lo-de.webp",
    path: APP_PATH.LO_DE,
  },
  {
    label: "Bắn Cá",
    imagePC: "games/featured-aliases/ban-ca.webp",
    imageMB: "games/featured-aliases/ban-ca.webp",
    path: APP_PATH.BAN_CA,
    alias: GameAliasEnum.BAN_CA,
  },
  {
    label: "Game Nhanh",
    imagePC: "games/featured-aliases/game-nhanh.webp",
    imageMB: "games/featured-aliases/game-nhanh.webp",
    path: APP_PATH.QUICK_GAMES,
  },
];

export const featuredAliasesPC = featuredAliases.map((el) => ({
  label: el.label,
  image: el.imagePC,
  path: el.path,
  alias: el.alias,
}));

export const featuredAliasesMB = featuredAliases.map((el) => ({
  label: el.label,
  image: el.imageMB,
  path: el.path,
  alias: el.alias,
}));

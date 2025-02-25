export enum GameTagEnum {
  HOT = "Hot",
  NEW = "New",
  MAINTAIN = "Maintain",
}

export type IGameTag = {
  name?: GameTagEnum;
  img?: string;
};

export enum GameTypeEnum {
  GAME = "game",
  CASINO = "casino",
}

export enum IGameDenyInfoEnum {
  WELCOME = "WELCOME",
}

export type IGame = {
  name: string;
  type: GameTypeEnum;
  game_type: GameAliasEnum;
  partner_provider: string;
  partner_game_id: string;
  img: string;
  tags: IGameTag;
  deny_info?: IGameDenyInfoEnum;
  report_game_id?: string;
  is_demo?: boolean;
  maintain: boolean;
  table_id?: string;
};

export type IGamesResponse = {
  items: IGame[];
  limit: number;
  page: number;
  total: number;
  total_page: number;
  total_game_lobby: number;
};

export type IProvider = {
  code: string;
  name: string;
  url: string;
  img: string;
};

export type IGameAlias = {
  alias: GameAliasEnum;
  banner: string;
  display_name: string;
  icon: string;
  providers: IProvider[];
  total_games: number;
};

export type IGamePlay = {
  url: string;
  url_mobile: string;
};

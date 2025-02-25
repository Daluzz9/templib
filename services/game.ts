import type { $Fetch } from "nitropack";

type IFetchGamesOptions = {
  type: GameTypeEnum;
  alias?: GameAliasEnum;
  sortBy?: GameSortByEnum;
  page: number;
  limit: number;
  provider?: string;
};

type IFetchAliasesOptions = {
  type: GameTypeEnum;
};

export type IFetchGamePlayOptions = {
  gameType: GameTypeEnum;
  provider?: string;
  partnerGameId?: string;
  route?: string;
  isTrial?: boolean;
  tableId?: string;
  depositPath?: string;
};

export type IGameService = {
  getGames: (fetchOptions: IFetchGamesOptions) => Promise<IGamesResponse>;
  getAliases: (fetchOptions: IFetchAliasesOptions) => Promise<IGameAlias[]>;
  getGamePlay: (fetchOptions: IFetchGamePlayOptions) => Promise<IGamePlay>;
};

export const GameService = (fetchFn: $Fetch): IGameService => ({
  getGames: async (fetchOptions: IFetchGamesOptions): Promise<IGamesResponse> => {
    const { type, alias, provider, sortBy, page = 1, limit } = fetchOptions;
    const params = createFetchGamesParamsBuilder()
      .buildProvider(provider)
      .buildPathAlias(alias)
      .buildPage(page)
      .buildLimit(limit)
      .buildSortBy(sortBy)
      .build();

    const endpoint =
      type === GameTypeEnum.CASINO ? getGameEndpoints().getLiveCasinoGames() : getGameEndpoints().getGenericGames();

    const res = await fetchFn<IApiResponse<IGamesResponse>>(
      endpoint,
      createFetchOptionsBuilder().buildMethod("GET").buildParams(params).buildCredentials("include").build(),
    );

    return res.data;
  },

  getAliases: async (fetchOptions: IFetchAliasesOptions): Promise<IGameAlias[]> => {
    const { type } = fetchOptions;
    const params = createFetchGameAliasesParamsBuilder()
      .buildAlias(type === GameTypeEnum.GAME ? "game" : "livecasino")
      .build();

    const endpoint = getGameEndpoints().getGameAliases();

    const res = await fetchFn<IApiResponse<IGameAlias[]>>(
      endpoint,
      createFetchOptionsBuilder().buildMethod("GET").buildParams(params).buildCredentials("include").build(),
    );

    return res.data;
  },

  getGamePlay: async (fetchOptions: IFetchGamePlayOptions): Promise<IGamePlay> => {
    const params = createFetchPlayGameParamsBuilder()
      .buildGameId(fetchOptions.partnerGameId)
      .buildProvider(fetchOptions.gameType, fetchOptions.provider)
      .buildRoute(fetchOptions.route)
      .buildTrial(fetchOptions.isTrial)
      .buildTableId(fetchOptions.tableId)
      .buildDepositPath(fetchOptions.depositPath)
      .build();

    const endpoint =
      fetchOptions.gameType === GameTypeEnum.CASINO
        ? getGameEndpoints().getLivecasinoPlayUrl()
        : getGameEndpoints().getGamePlayUrl();

    const res = await fetchFn<IApiResponse<IGamePlay>>(
      endpoint,
      createFetchOptionsBuilder().buildMethod("GET").buildParams(params).buildCredentials("include").build(),
    );

    return res.data;
  },
});

type IParams = {
  partnerProvider?: string;
  partnerGameId?: string;
  ru?: string;
  is_demo?: boolean;
  tableId?: string;
  partnerCode?: string;
  depositPath?: string;
};

export default function createFetchPlayGameParamsBuilder() {
  const params: Partial<IParams> = {};

  return {
    buildTrial(is_demo: IParams["is_demo"]) {
      params.is_demo = is_demo;
      return this;
    },

    buildRoute(route: IParams["ru"]) {
      params.ru = route;
      return this;
    },

    buildProvider(gameType: GameTypeEnum, provider: IParams["partnerProvider"]) {
      // use partnerCode instead partnerProvider in case game type is casino
      if (gameType === GameTypeEnum.GAME) {
        params.partnerProvider = provider;
      } else {
        params.partnerCode = provider;
      }
      return this;
    },

    buildGameId(gameId: IParams["partnerGameId"]) {
      params.partnerGameId = gameId;
      return this;
    },
    buildDepositPath(depositPath: IParams["depositPath"]) {
      params.depositPath = depositPath;
      return this;
    },
    // use in case game type is casino
    buildTableId(tableId: IParams["tableId"]) {
      params.tableId = tableId;
      return this;
    },

    build() {
      return params as IParams;
    },
  };
}

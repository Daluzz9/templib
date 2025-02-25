export enum TabOddsEnum {
  FULlTIME = "fulltime",
  HALFTIME = "halftime",
}

export const LABEL = {
  BUTTON_KSPORTS: "K-SPORTS",
  BUTTON_SSPORTS: "A-SPORTS",
};

// TODO: Meidai or Robin update return type
export const formatMatchListData = (matchList: IMatchDetailData[], expandedRowId: string) => {
  return matchList.map((matchDetail: IMatchDetailData) => {
    const isExpanded = expandedRowId === `${matchDetail.match_id}-${matchDetail.imatch_id}`;
    return {
      ...matchDetail,
      rates: [
        {
          isExpanded: isExpanded,
          isHighlighted: matchDetail.ahFT?.favorite,
          odds: [
            { value: matchDetail.hTeam?.odds },
            { value: matchDetail.hTeam?.rate, isRateValue: true },
            { value: matchDetail.aTeam?.odds },
          ],
        },
        {
          isExpanded: isExpanded,
          isHighlighted: matchDetail.overFT?.favorite,
          odds: [
            { value: matchDetail.overFT?.hTeam?.odds },
            { value: matchDetail.overFT?.hTeam?.rate, isRateValue: true },
            { value: matchDetail.overFT?.aTeam?.odds, isOverOdds: true },
            { value: matchDetail.overFT?.aTeam?.odds },
          ],
        },
        {
          isSingleOdds: true,
          isExpanded: isExpanded,
          odds: [
            { value: matchDetail.winFT?.hTeam?.odds },
            { value: matchDetail.winFT?.hTeam?.rate, isDefaultHidden: true, isRateValue: true },
            { value: matchDetail.winFT?.aTeam?.odds, isDefaultHidden: true },
          ],
        },
        {
          isExpanded: isExpanded,
          isHighlighted: matchDetail.ahHT?.favorite,
          odds: [
            { value: matchDetail.ahHT?.hTeam?.odds },
            { value: matchDetail.ahHT?.hTeam?.rate, isRateValue: true },
            { value: matchDetail.ahHT?.aTeam?.odds },
          ],
        },
        {
          isExpanded: isExpanded,
          isHighlighted: matchDetail.overHT?.favorite,
          odds: [
            { value: matchDetail.overHT?.hTeam?.odds },
            { value: matchDetail.overHT?.hTeam?.rate, isRateValue: true },
            { value: matchDetail.overHT?.aTeam?.odds, isOverOdds: true },
            { value: matchDetail.overHT?.aTeam?.odds },
          ],
        },
        {
          isSingleOdds: true,
          isExpanded: isExpanded,
          odds: [
            { value: matchDetail.winHT?.hTeam?.odds },
            { value: matchDetail.winHT?.hTeam?.rate, isDefaultHidden: true, isRateValue: true },
            { value: matchDetail.winHT?.aTeam?.odds, isDefaultHidden: true },
          ],
        },
      ],
      athenaRates: [
        {
          isExpanded: isExpanded,
          isHighlighted: matchDetail.athena_ahFT?.favorite,
          odds: [
            { value: matchDetail.athena_ahFT?.hTeam?.odds },
            { value: matchDetail.athena_ahFT?.hTeam?.rate, isRateValue: true },
            { value: matchDetail.athena_ahFT?.aTeam?.odds },
          ],
        },
        {
          isExpanded: isExpanded,
          isHighlighted: matchDetail.athena_overFT?.favorite,
          odds: [
            { value: matchDetail.athena_overFT?.hTeam?.odds },
            { value: matchDetail.athena_overFT?.hTeam?.rate, isRateValue: true },
            { value: matchDetail.athena_overFT?.aTeam?.odds, isOverOdds: true },
            { value: matchDetail.athena_overFT?.aTeam?.odds },
          ],
        },
        {
          isSingleOdds: true,
          isExpanded: isExpanded,
          odds: [
            { value: matchDetail.athena_winFT?.hTeam?.odds },
            { value: matchDetail.athena_winFT?.hTeam?.rate, isDefaultHidden: true, isRateValue: true },
            { value: matchDetail.athena_winFT?.aTeam?.odds, isDefaultHidden: true },
          ],
        },
        {
          isExpanded: isExpanded,
          isHighlighted: matchDetail.athena_ahHT?.favorite,
          odds: [
            { value: matchDetail.athena_ahHT?.hTeam?.odds },
            { value: matchDetail.athena_ahHT?.hTeam?.rate, isRateValue: true },
            { value: matchDetail.athena_ahHT?.aTeam?.odds },
          ],
        },
        {
          isExpanded: isExpanded,
          isHighlighted: matchDetail.athena_overHT?.favorite,
          odds: [
            { value: matchDetail.athena_overHT?.hTeam?.odds },
            { value: matchDetail.athena_overHT?.hTeam?.rate, isRateValue: true },
            { value: matchDetail.athena_overHT?.aTeam?.odds, isOverOdds: true },
            { value: matchDetail.athena_overHT?.aTeam?.odds },
          ],
        },
        {
          isSingleOdds: true,
          isExpanded: isExpanded,
          odds: [
            { value: matchDetail.athena_winHT?.hTeam?.odds },
            { value: matchDetail.athena_winHT?.hTeam?.rate, isDefaultHidden: true, isRateValue: true },
            { value: matchDetail.athena_winHT?.aTeam?.odds, isDefaultHidden: true },
          ],
        },
      ],
    };
  });
};

export type IFormattedMatchRateData = {
  ksports: {
    favorite: boolean;
    rate: number;
    odds: number;
    isOverOdds?: boolean;
  };
  name: string;
  ssports: {
    favorite: boolean;
    rate: number;
    odds: number;
    isOverOdds?: boolean;
  };
};

export type IFormattedMatchDetailData = {
  matchInfo: {
    ah: IMatchDetailData["ahFT"] | IMatchDetailData["ahHT"];
    athena_ah: IMatchDetailData["athena_ahFT"] | IMatchDetailData["athena_ahFT"];
    over: IMatchDetailData["overFT"] | IMatchDetailData["overHT"];
    athena_over: IMatchDetailData["athena_overFT"] | IMatchDetailData["athena_overHT"];
    win: IMatchDetailData["winFT"] | IMatchDetailData["winHT"];
    athena_win: IMatchDetailData["athena_winFT"] | IMatchDetailData["athena_winHT"];
  };
  matchRate: {
    awayHome: IFormattedMatchRateData[];
    over: IFormattedMatchRateData[];
  };
  matchWinRates: {
    ksports: number;
    name: string;
    ssports: number;
  }[];
};

export const formatMatchDetailData = (
  matchDetail: IMatchDetailData,
  activeTab: TabOddsEnum,
): IFormattedMatchDetailData => {
  const keyTime = activeTab === TabOddsEnum.FULlTIME ? "FT" : "HT";

  // Get data by tab
  const matchInfo = {
    ah: matchDetail?.[`ah${keyTime}`],
    athena_ah: matchDetail?.[`athena_ah${keyTime}`],
    over: matchDetail?.[`over${keyTime}`],
    athena_over: matchDetail?.[`athena_over${keyTime}`],
    win: matchDetail?.[`win${keyTime}`],
    athena_win: matchDetail?.[`athena_win${keyTime}`],
  };

  // Format data
  const matchAwayHome = matchInfo.ah || {};
  const matchAthenaAwayHome = matchInfo.athena_ah || {};
  const awayHome = [
    {
      ksports: { ...(matchAwayHome.hTeam || {}), favorite: matchAwayHome.favorite },
      name: matchDetail.teams[0]?.name,
      ssports: { ...(matchAthenaAwayHome.hTeam || {}), favorite: matchAthenaAwayHome.favorite },
    },
    {
      ksports: { ...(matchAwayHome.aTeam || {}), favorite: matchAwayHome.favorite },
      name: matchDetail.teams[1]?.name,
      ssports: { ...(matchAthenaAwayHome.aTeam || {}), favorite: matchAthenaAwayHome.favorite },
    },
  ];

  const matchOver = matchInfo.over || {};
  const matchAthenaOver = matchInfo.athena_over || {};
  const over = [
    {
      ksports: { ...(matchOver.hTeam || {}), favorite: matchOver.favorite },
      name: "Tài",
      ssports: { ...(matchAthenaOver.hTeam || {}), favorite: matchAthenaOver.favorite },
    },
    {
      ksports: { ...(matchOver.aTeam || {}), favorite: matchOver.favorite, isOverOdds: true },
      name: "Xỉu",
      ssports: { ...(matchAthenaOver.aTeam || {}), favorite: matchAthenaOver.favorite, isOverOdds: true },
    },
  ];
  const matchRate = { awayHome, over };

  const matchWin = matchInfo.win || {};
  const matchAthenaWin = matchInfo.athena_win || {};
  const matchWinRates = [
    { ksports: matchWin.hTeam?.odds, name: "Đội nhà", ssports: matchAthenaWin.hTeam?.odds },
    { ksports: matchWin.aTeam?.rate, name: "Hoà", ssports: matchAthenaWin.hTeam?.rate },
    { ksports: matchWin.aTeam?.odds, name: "Đội khách", ssports: matchAthenaWin.aTeam?.odds },
  ];

  return { matchInfo, matchRate, matchWinRates };
};

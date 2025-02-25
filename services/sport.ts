import type { $Fetch } from "nitropack";
import type { LocationQuery } from "vue-router";

type ISchedulePayload = {
  type: string;
  date: string;
};

type IGetSportUrlPayload = {
  sportProvider: SportProvidersEnum;
  match?: Pick<IMatchDetailData, "match_id" | "league_id" | "live"> | LocationQuery;
};

type IHotMatchPayload = {
  limit: number;
};

export type ISportService = {
  getSportUrl: (payload: IGetSportUrlPayload) => Promise<ISportUrlProvider>;
  getSchedule: (payload: ISchedulePayload) => Promise<IScheduleData>;
  getHotMatch: (payload: IHotMatchPayload) => Promise<IMatchDetailData[]>;
};

export const SportService = (fetchFn: $Fetch): ISportService => ({
  getSportUrl: async (payload: IGetSportUrlPayload): Promise<ISportUrlProvider> => {
    const { match, sportProvider } = payload;
    const loginPath = "?popup=login";
    const registerPath = "?popup=register";

    let sportFetchOptions;
    if (match && "match_id" in match && "league_id" in match) {
      const matchId = Number(match.match_id);
      const leagueId = Number(match.match_id);
      const live = match.live;
      const liveValue: string | undefined = live?.toString();

      const sportFetchParams = createSportParamBuilder()
        .buildMatchId(matchId)
        .buildLeagueId(leagueId)
        .buildLoginPath(loginPath)
        .buildRegisterPath(registerPath)
        .buildUtmSource()
        .buildLive(liveValue || "")
        .build();
      sportFetchOptions = createFetchOptionsBuilder().buildParams(sportFetchParams).build();
    }
    getSportEndpoints().getKSportUrl();

    const sportRequestMap = {
      [SportProvidersEnum.KSPORTS]: getSportEndpoints().getKSportUrl(),
      [SportProvidersEnum.CSPORTS]: getSportEndpoints().getAthenaSportUrl(),
      [SportProvidersEnum.SSPORTS]: getSportEndpoints().getAthenaSportUrl(),
      [SportProvidersEnum.MSPORTS]: getSportEndpoints().getImSportUrl(),
      [SportProvidersEnum.TSPORTS]: getSportEndpoints().getTSportUrl(),
      [SportProvidersEnum.VSPORTS]: getSportEndpoints().getAthenaVirtualSportUrl(),
      [SportProvidersEnum.ESPORTS]: getSportEndpoints().getAthenaESportUrl(),
      [SportProvidersEnum.PSPORTS]: getSportEndpoints().getSSportUrl(),
      [SportProvidersEnum.ASPORTS]: getSportEndpoints().getAthenaSportUrl(),
    };

    const endpoint = sportRequestMap?.[sportProvider];
    const res = await fetchFn<IApiResponse<ISportUrlProvider>>(endpoint, sportFetchOptions);

    return res.data;
  },
  getSchedule: async (payload: ISchedulePayload): Promise<IScheduleData> => {
    const _options = createFetchOptionsBuilder()
      .buildMethod("GET")
      .buildParams(payload || {})
      .build();

    const res = await fetchFn<IApiResponse<IScheduleData>>(getHotmatchEndpoint().getScheduleMatch(), _options);

    return res.data;
  },
  getHotMatch: async (payload: IHotMatchPayload): Promise<IMatchDetailData[]> => {
    const _options = createFetchOptionsBuilder()
      .buildMethod("GET")
      .buildParams(payload || {})
      .build();

    const res = await fetchFn<IApiResponse<IMatchDetailData[]>>(getHotmatchEndpoint().getHotMatch(), _options);

    return res.data;
  },
});

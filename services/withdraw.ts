import type { $Fetch } from "nitropack";

export type IWithdrawService = {
  getWithdrawCard: (payload: IWithdrawCardBody) => Promise<IWithdrawCardData>;
  getWithdrawBank: (payload: IWithdrawBankBody) => Promise<IWithdrawBankData>;
};

export const WithdrawService = (fetchFn: $Fetch): IWithdrawService => ({
  getWithdrawCard: async (payload: IWithdrawCardBody): Promise<IWithdrawCardData> => {
    const _options = createFetchOptionsBuilder()
      .buildMethod("POST")
      .buildBody(payload)
      .buildCredentials("include")
      .build();

    const res = await fetchFn<IApiResponse<IWithdrawCardData>>(getWithdrawEndpoints().getWithdrawCard(), _options);

    return res.data;
  },
  getWithdrawBank: async (payload: IWithdrawBankBody): Promise<IWithdrawBankData> => {
    const _options = createFetchOptionsBuilder()
      .buildMethod("POST")
      .buildBody(payload)
      .buildCredentials("include")
      .build();

    const res = await fetchFn<IApiResponse<IWithdrawBankData>>(getWithdrawEndpoints().getWithdrawBank(), _options);

    return res.data;
  },
});

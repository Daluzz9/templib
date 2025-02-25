import type { $Fetch } from "nitropack";

export type IDepositService = {
  depositNicePay: (params: Record<string, string | number>) => Promise<IDepositCodePayData>;
  depositGoPay: (body: Record<string, string | number>) => Promise<IDepositCodePayData>;
  getEWalletTransferCode: () => Promise<IEWalletTransferCodeData["code"]>;
  sendDepositCardRequest: (params: IDepositPhoneCardBody) => Promise<IDepositCardData>;
};

export const DepositService = (fetchFn: $Fetch): IDepositService => ({
  depositNicePay: async (params: Record<string, string | number>): Promise<IDepositCodePayData> => {
    const options = createFetchOptionsBuilder()
      .buildMethod("GET")
      .buildParams(params)
      .buildCredentials("include")
      .build();
    const rs = await fetchFn<IApiResponse<IDepositCodePayData>>(getDepositEndpoints().depositNicePay(), options);

    return rs.data;
  },
  depositGoPay: async (body: Record<string, string | number>): Promise<IDepositCodePayData> => {
    const options = createFetchOptionsBuilder().buildMethod("POST").buildBody(body).buildCredentials("include").build();
    const rs = await useNuxtApp().$api<IApiResponse<IDepositCodePayData>>(
      getDepositEndpoints().depositProviderGoPay(),
      options,
    );

    return rs.data;
  },
  getEWalletTransferCode: async (): Promise<IEWalletTransferCodeData["code"]> => {
    const options = createFetchOptionsBuilder().buildMethod("GET").build();

    const res = await fetchFn<IApiResponse<IEWalletTransferCodeData>>(
      getDepositEndpoints().getEWalletTransferCode(),
      options,
    );

    return res.data.code;
  },
  sendDepositCardRequest: async (params: IDepositPhoneCardBody): Promise<IDepositCardData> => {
    const options = createFetchOptionsBuilder()
      .buildMethod("POST")
      .buildBody(params)
      .buildCredentials("include")
      .build();

    const res = await fetchFn<IApiResponse<IDepositCardData>>(getDepositEndpoints().getDepositCard(), options);

    return res.data;
  },
});

import type { $Fetch } from "nitropack";

export type ISystemService = {
  getSystemDepositPayment: () => Promise<ISystemDepositPayment>;
  refreshUserInfo: (headers: Record<string, unknown>) => Promise<IRefreshResponse["user"]>;
  getSystemCardPayment: () => Promise<IGetSystemCardPaymentResponse["cardlist"]>;
  getSystemPlan: () => Promise<ISystemPlan>;
  getSystemRankConfig: () => Promise<ISystemRankConfig>;
  getSystemBankPayment: () => Promise<ISystemBankPayment>;
  getNotification: () => Promise<IUserNoti[]>;
  getDepositCryptoNetwork: (network: string) => Promise<ICryptoV2SysDepositPaymentMethod[]>;
  withdrawCrypto: (payload: Record<string, undefined | string>) => Promise<IWithdrawCrypto>;
  getHeroBanners: () => Promise<IBanner[]>;
  getJackpotSummary: () => Promise<IJackpotSummary>;
  getJackpots: () => Promise<IJackpotMapData>;
  getPromotions: (params: { alias: string }) => Promise<IEventData[]>;
  getPromotionByAlias: (alias: string) => Promise<IEventDetailData>;
  getPromotionStatistic: (params: { alias: string; period_id?: string }) => Promise<IEventStatisticData[]>;
  getContacts: () => Promise<IContact[]>;
  getSystemSeo: () => Promise<ISystemSeoItem[]>;
  sendOtp: () => Promise<IApiResponseWithOptionalData<ISystemOtpData>>;
  verifyOtp: (otp: string) => Promise<IApiResponseWithoutData>;
};

type IAPEventStatisticResponse<T> = Omit<IApiResponse<unknown>, "data"> & {
  data: { top: T };
};

export const SystemService = (fetchFn: $Fetch): ISystemService => ({
  getSystemDepositPayment: async (): Promise<ISystemDepositPayment> => {
    const res = await fetchFn<IApiResponse<ISystemDepositPayment>>(getSystemEndpoints().getSystemDepositPayment());

    return res.data;
  },
  refreshUserInfo: async (headers: Record<string, unknown>): Promise<IRefreshResponse["user"]> => {
    const res = await fetchFn<IRefreshResponse>(getSystemEndpoints().refreshUserInfo(), headers);

    return res.user;
  },
  getSystemCardPayment: async (): Promise<IGetSystemCardPaymentResponse["cardlist"]> => {
    const res = await fetchFn<IGetSystemCardPaymentResponse>(getSystemEndpoints().getSystemCardPayment());

    return res.cardlist;
  },
  getSystemPlan: async (): Promise<ISystemPlan> => {
    const res = await fetchFn<IApiResponse<ISystemPlan>>(getSystemEndpoints().getSystemPlan());

    return res.data;
  },
  getSystemRankConfig: async (): Promise<ISystemRankConfig> => {
    const res = await fetchFn<IApiResponse<ISystemRankConfig>>(getSystemEndpoints().getSystemRankConfig());

    return res.data;
  },
  getSystemBankPayment: async (): Promise<ISystemBankPayment> => {
    const res = await fetchFn<IApiResponse<ISystemBankPayment>>(getSystemEndpoints().getSystemBankPayment());

    return res.data;
  },
  getNotification: async (): Promise<IUserNoti[]> => {
    const notiOption = createFetchOptionsBuilder().buildMethod("GET").build();

    const res = await fetchFn<IApiResponse<IUserNoti[]>>(getSystemEndpoints().getNotification(), notiOption);

    return res.data;
  },
  getDepositCryptoNetwork: async (network: string): Promise<ICryptoV2SysDepositPaymentMethod[]> => {
    const res = await fetchFn<IApiResponse<ICryptoV2SysDepositPaymentMethod[]>>(
      getDepositEndpoints().cryptoTransferAddress(network),
      {
        params: createBaseParamsBuilder().build(),
      },
    );

    return res.data;
  },
  withdrawCrypto: async (payload: Record<string, undefined | string>): Promise<IWithdrawCrypto> => {
    const options = createFetchOptionsBuilder()
      .buildMethod("POST")
      .buildBody(payload)
      .buildCredentials("include")
      .build();

    const res = await fetchFn<IApiResponse<IWithdrawCrypto>>(getWithdrawEndpoints().getCryptoWithdraw(), options);

    return res.data;
  },
  getHeroBanners: async (): Promise<IBanner[]> => {
    const options = createFetchOptionsBuilder().buildMethod("GET").buildCredentials("include").build();
    const res = await fetchFn<IApiResponse<IBanner[]>>(getSystemEndpoints().getHomepageBanner(), options);

    return res.data;
  },
  getJackpotSummary: async (): Promise<IJackpotSummary> => {
    const res = await fetchFn<IApiResponse<IJackpotSummary>>(getSystemEndpoints().geJackpotSummary());

    return res.data;
  },
  getJackpots: async (): Promise<IJackpotMapData> => {
    const res = await fetchFn<IApiResponse<IJackpotMapData>>(getSystemEndpoints().getJackpots());

    return res.data;
  },
  getPromotions: async (params: { alias: string }): Promise<IEventData[]> => {
    const options = createFetchOptionsBuilder()
      .buildMethod("GET")
      .buildParams(params)
      .buildCredentials("include")
      .build();

    const res = await fetchFn<IApiResponse<IEventData[]>>(getSystemEndpoints().getPromotions(), options);

    return res.data;
  },
  getPromotionByAlias: async (alias: string): Promise<IEventDetailData> => {
    const options = createFetchOptionsBuilder().buildMethod("GET").buildCredentials("include").build();
    const res = await fetchFn<IApiResponse<IEventDetailData>>(
      getSystemEndpoints().getPromotions() + `/${alias}`,
      options,
    );

    return res.data;
  },
  getPromotionStatistic: async (params: { alias: string; period_id?: string }): Promise<IEventStatisticData[]> => {
    const options = createFetchOptionsBuilder()
      .buildMethod("GET")
      .buildParams(params)
      .buildCredentials("include")
      .build();

    const res = await fetchFn<IAPEventStatisticResponse<IEventStatisticData[]>>(
      getSystemEndpoints().getPromotionStatistic(),
      options,
    );

    return res.data.top;
  },

  getContacts: async (): Promise<IContact[]> => {
    const options = createFetchOptionsBuilder().buildMethod("GET").buildCredentials("include").build();

    const res = await fetchFn<IApiResponse<IContact[]>>(getSystemEndpoints().getContacts(), options);

    return res.data;
  },
  getSystemSeo: async (): Promise<ISystemSeoItem[]> => {
    const res = await fetchFn<IApiResponse<ISystemSeoItem[]>>(getSystemEndpoints().getSystemSeo());

    return res.data;
  },
  sendOtp: async (): Promise<IApiResponseWithOptionalData<ISystemOtpData>> => {
    const res = await fetchFn<IApiResponseWithOptionalData<ISystemOtpData>>(getSystemEndpoints().sendOtp());

    return res;
  },
  verifyOtp: async (otp): Promise<IApiResponseWithoutData> => {
    const res = await fetchFn<IApiResponseWithoutData>(getSystemEndpoints().verifyOtp(), {
      method: "POST",
      body: {
        otp,
      },
    });

    return res;
  },
});

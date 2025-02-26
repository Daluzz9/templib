import type { $Fetch } from "nitropack";

export type ISeoService = {
  getSeoInfo: () => Promise<ISeoResponse>;
  getBrandInfo: () => Promise<IBrandAssets>;
};

export const SeoService = (fetchFn: $Fetch): ISeoService => ({
  getSeoInfo: async (): Promise<ISeoResponse> => {
    const res = await fetchFn<IApiResponse<ISeoResponse>>(getSeoEndPoints().getSeoInfo());
    return res.data;
  },
  getBrandInfo: async (): Promise<IBrandAssets> => {
    const res = await fetchFn<IApiResponse<IBrandAssets>>(getSeoEndPoints().getBrandInfo());
    return res.data;
  },
});

import get from "lodash/get";
import type { AsyncDataOptions, NuxtApp } from "nuxt/app";
import type { FetchError } from "ofetch";

// in ms
// undefined = no expiration time
const DEFAULT_TTL = undefined;
type ICustomFetchOption = { ttl?: number; cache?: boolean };

export const useApi = <ResT, ErrorT = FetchError<INuxtCustomError>, DataT = ResT>(
  key: string,
  handler: (ctx?: NuxtApp) => Promise<ResT>,
  options?: AsyncDataOptions<ResT, DataT> & ICustomFetchOption,
) => {
  return useAsyncData<ResT, ErrorT, DataT>(
    key,
    (ctx?: NuxtApp) => {
      const doCache = get(options, "cache", true);
      const ttl = get(options, "ttl", DEFAULT_TTL);

      const res = handler(ctx);

      if (doCache) {
        ctx?.$cacheMap.value.set(key, ttl ? Date.now() + ttl : undefined);
      }

      return res;
    },
    {
      ...options,
      getCachedData(key, nuxtApp: NuxtApp) {
        const doCache = get(options, "cache", true);

        const data = nuxtApp.payload.data[key] || nuxtApp.static.data[key];

        if (!data || !doCache) {
          return;
        }

        const expireAt = nuxtApp.$cacheMap.value.get(key);

        if (expireAt && expireAt < Date.now()) {
          nuxtApp.$cacheMap.value.delete(key);
          return;
        }

        return data;
      },
    },
  );
};

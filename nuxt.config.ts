import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { NANO_PLAYER_SCRIPT_URL } from "./constants/livestream";
import { generateHash } from "./utils";
import { loopThroughMonths } from "./utils/sitemap";
const EXTERNAL_IMAGE_SOURCE = process.env.EXTERNAL_IMAGE_SOURCE?.split(",") || [].map((el: string) => el.trim());
const currentDir = dirname(fileURLToPath(import.meta.url));

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    cdnURL: process.env.NUXT_APP_CDN_URL,
    head: {
      htmlAttrs: {
        lang: "vi",
      },
      script: [
        {
          src: NANO_PLAYER_SCRIPT_URL,
          type: "text/javascript",
          defer: true,
        },
      ],
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1, maximum-scale=1.0, viewport-fit=cover, user-scalable=no",
        },
        { charset: "utf-8" },
        { name: "google", content: "notranslate" },
        { "http-equiv": "Content-Language", content: "vi" },
        { name: "og:type", content: "Website" },
        { name: "og:site_name", content: `Nhà cái ${process.env.BRAND_NAME}` },
        { name: "author", content: `Nhà cái ${process.env.BRAND_NAME}` },
      ],
    },
  },
  compatibilityDate: "2024-11-01",
  $env: {
    local: {},
  },

  modules: [
    "@nuxt/eslint",
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "nuxt-svgo",
    "@nuxt/image",
    "@vee-validate/nuxt",
    "@nuxtjs/device",
    "@vueuse/nuxt",
    "@pinia/nuxt",
    "@formkit/auto-animate/nuxt",
    "@nuxtjs/sitemap",
    "@nuxtjs/robots",
  ],

  // https://svgo.dev/docs/plugins
  svgo: {
    svgoConfig: {
      multipass: true,
      plugins: [
        "removeDoctype",
        "removeComments",
        "removeMetadata",
        {
          name: "addClassesToSVGElement",
          params: {
            className: "nuxt-svgo",
          },
        },
        {
          name: "preset-default",
          params: {
            overrides: {
              inlineStyles: {
                onlyMatchedOnce: false,
              },

              removeViewBox: false,
            },
          },
        },
      ],
    },
  },

  css: [
    join(currentDir, "./assets/css/animation.css"),
    join(currentDir, "./assets/css/fonts.css"),
    join(currentDir, "./assets/css/tailwind.css"),
  ],

  tailwindcss: {
    cssPath: ["~/assets/css/tailwind.css", { injectPosition: "first" }], //First position has the lowest priority, last position overrides everything and hence has the highest priority.
    configPath: "tailwind.config.js",
    exposeConfig: {
      level: 2,
    },
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
      "postcss-url": {
        url: (asset: { url: string }) => {
          const baseURL = process.env.NUXT_APP_CDN_URL;
          if (asset.url.startsWith("/")) {
            return `${baseURL}${asset.url}`;
          }
          return asset.url;
        },
      },
    },
  },

  pinia: {
    storesDirs: ["./stores/**"],
  },

  robots: {
    configPath: "~/robots.config.js",
  },

  sitemap: {
    xsl: false,
    sitemapsPathPrefix: "/",
    sitemaps: {
      "sitemap-app": {
        sources: ["/api/sitemap/urls"],
      },
      "sitemap-news-category": {
        sources: ["/api/sitemap/urls"],
      },
      "sitemap-event-category": {
        sources: ["/api/sitemap/urls"],
      },
      "sitemap-event": {
        sources: ["/api/sitemap/urls"],
      },
      ...loopThroughMonths(9, 2024).reduce((acc, item) => {
        return { ...acc, [`sitemap-news-${item}`]: { sources: ["/api/sitemap/urls"] } };
      }, {}),
    },
  },

  veeValidate: {
    autoImports: true,
  },

  image: {
    domains: [process.env.NUXT_APP_CDN_URL as string, ...EXTERNAL_IMAGE_SOURCE],
    format: ["webp"],
    provider: "ipx",
  },
  imports: {
    dirs: ["composables/**", "api/**", "types/**", "endpoints/**", "builder/**", "constants/**", "services/**"],
  },
  shadcn: {
    prefix: "",
    componentDir: join(currentDir, "./components/atomics/shadcn"),
  },

  devServer: {
    port: Number(process.env.APP_PORT) || 3000,
    host: "0.0.0.0",
  },

  components: {
    dirs: [
      {
        path: join(currentDir, "./components/atomics/custom"),
        pathPrefix: false,
        extensions: ["vue"],
      },
      {
        path: join(currentDir, "./components/molecules"),
        pathPrefix: false,
        extensions: ["vue"],
      },
      {
        path: join(currentDir, "./components/organisms"),
        pathPrefix: false,
        extensions: ["vue"],
      },
      {
        path: "~/components/templates",
        pathPrefix: false,
        extensions: ["vue"],
      },
      { path: "~/components/pages", pathPrefix: true, extensions: ["vue"] },
    ],
  },

  // sourcemap: { server: false, client: false },
  eslint: {},
  nitro: {
    compressPublicAssets: {
      brotli: true,
      gzip: true,
    },
    serveStatic: true,
    preset: "node",
  },
  runtimeConfig: {
    API_PROXY_V1: `${process.env.API_BASE_URL}${process.env.API_VER_1}`,
    API_PROXY_V2: `${process.env.API_BASE_URL}${process.env.API_VER_1}`,
    PROMOTION_API_PROXY: `${process.env.API_PROMOTION_BASE_URL}${process.env.API_PROMOTION}`,
    BRAND_CODE: process.env.BRAND_CODE,
    public: {
      APP_ENV: process.env.APP_ENV,
      APP_VERSION: (process.env.APP_VERSION || generateHash(7)).slice(0, 7),
      NUXT_APP_CDN_URL: process.env.NUXT_APP_CDN_URL,
      API_VER_1: process.env.API_VER_1,
      API_VER_2: process.env.API_VER_2,
      API_PROMOTION: process.env.API_PROMOTION,
      BRAND_NAME: process.env.BRAND_NAME,
      VERIFY_PHONE_BOT_URL: process.env.VERIFY_PHONE_BOT_URL,
      TELE_ANDROID_DOWNLOAD_URL: process.env.TELE_ANDROID_DOWNLOAD_URL,
      TELE_IOS_DOWNLOAD_URL: process.env.TELE_IOS_DOWNLOAD_URL,
      CHECK_IP: process.env.CHECK_IP,
      IP_WHITELIST: process.env.IP_WHITELIST,
      LIVE_CHAT_ID: process.env.LIVE_CHAT_ID,
      TELEGRAM_BRAND: process.env.TELEGRAM_BRAND,
      TELEGRAM_COMMUNITY: process.env.TELEGRAM_COMMUNITY,
      FACEBOOK_GROUP: process.env.FACEBOOK_GROUP,
      HOTLINE: process.env.HOTLINE,
    },
  },
});

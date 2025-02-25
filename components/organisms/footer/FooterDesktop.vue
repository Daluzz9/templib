<script setup lang="ts">
import { getFooterNavigationPC, getFooterContent, providerImgList, gamblingRegulationLogos } from "./static";

const router = useRouter();
const route = useRoute();
const { systemSeoByPage } = useSystemSeo(route);
type ISubcategory = {
  title: string;
  link: string;
};

const footerContent = getFooterContent();
const footerNavigation = getFooterNavigationPC();

const goHome = () => {
  router.push({ path: APP_PATH.HOME });
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
const chunkCategories = (arraySubCategory: ISubcategory[], size: number) => {
  const result: ISubcategory[][] = [];
  for (let i = 0; i < arraySubCategory.length; i += size) {
    result.push(arraySubCategory.slice(i, i + size));
  }
  return result;
};
</script>

<template>
  <footer id="footer" class="bg-[#303438]">
    <div class="container">
      <div class="flex w-full justify-start py-6">
        <NuxtLink :to="APP_PATH.HOME" class="flex h-8 w-32 cursor-pointer items-center justify-end" @click="goHome">
          <Image src="logo.webp" alt="logo" width="100px" height="24px" :preload="true" img-class="object-contain" />
        </NuxtLink>
        <div class="mx-6 pb-2 pl-6 text-left">
          <div class="text-[20px]" v-html="sanitizeHTMLContent(systemSeoByPage.content_title)" />
          <div
            class="text-[16px] tracking-wider text-neutral-400"
            v-html="sanitizeHTMLContent(systemSeoByPage.content_description)"
          />
        </div>
      </div>

      <div class="my-8 flex h-[90px] w-full flex-wrap justify-between gap-3">
        <div v-for="footerItemInfo in footerNavigation" :key="footerItemInfo.title" class="mb-4 w-full sm:w-auto">
          <h3 class="mb-3 font-semibold uppercase text-white">{{ footerItemInfo.title }}</h3>
          <div class="flex flex-wrap gap-8">
            <div
              v-for="(chunk, index) in chunkCategories(footerItemInfo.subCategories, 2)"
              :key="index"
              class="flex w-full flex-col gap-y-4 sm:w-auto"
            >
              <NuxtLink
                v-for="category in chunk"
                :key="category.title"
                :href="category.link"
                class="text-sm text-neutral-100 hover:underline"
              >
                {{ category.title }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full border-y border-[#34393D]">
      <div class="container">
        <div class="mask-fade-right w-full overflow-hidden">
          <div class="flex h-[60px] w-[200%] animate-marquee-slide gap-[66px]">
            <div class="flex w-full items-center gap-[66px]">
              <Image
                v-for="providerInfo in providerImgList"
                :key="providerInfo"
                :src="providerInfo"
                :alt="providerInfo"
                height="28px"
                img-class="object-contain"
                class="provider-item w-full"
              />
            </div>
            <div class="flex w-full items-center gap-[66px]">
              <Image
                v-for="providerInfo in providerImgList"
                :key="providerInfo"
                :src="providerInfo"
                :alt="providerInfo"
                height="28px"
                img-class="object-contain"
                class="provider-item w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="flex w-full items-start justify-between py-4">
        <div class="flex items-center gap-4">
          <Image src="dmca.webp" height="26px" width="52px" alt="dmca image" />
          <p class="text-[12px] text-xs text-[#B0B6BF]">{{ footerContent.COPY_RIGHT }}</p>
        </div>

        <div class="flex items-center gap-5">
          <Image
            v-for="gamblingInfo in gamblingRegulationLogos"
            :key="gamblingInfo"
            :src="gamblingInfo"
            :alt="gamblingInfo"
          />
        </div>
      </div>
    </div>
  </footer>
</template>

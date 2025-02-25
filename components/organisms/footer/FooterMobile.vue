<script setup lang="ts">
import { getFooterNavigationMB, getFooterContent, gamblingRegulationLogos } from "./static";
const props = defineProps<{ contacts: IContact[] }>();

const router = useRouter();
const route = useRoute();
const { systemSeoByPage } = useSystemSeo(route);

const footerContent = getFooterContent();
const staticFooterNavigation = getFooterNavigationMB();

const navigation = computed(() => {
  const list = [...staticFooterNavigation];
  if (props.contacts) {
    const contactItem = {
      title: "Liên hệ 24/7",
      subCategories: props.contacts.map((contact) => {
        return {
          title: contact.display_name,
          link: contact.url,
          icon: contact.img,
          newTab: true,
        };
      }),
    };
    list.push(contactItem);
  }

  return list;
});
const goHome = () => {
  router.push({ path: APP_PATH.HOME });
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
</script>

<template>
  <footer id="footer py-3">
    <div class="container">
      <div class="flex flex-col gap-2">
        <NuxtLink :to="APP_PATH.HOME" class="flex h-8 w-32 cursor-pointer items-center justify-start" @click="goHome">
          <Image src="logo.webp" alt="logo" width="100px" height="24px" :preload="true" img-class="object-contain" />
        </NuxtLink>

        <div class="text-sm text-neutral-200" v-html="sanitizeHTMLContent(systemSeoByPage.content_title)" />
        <div class="hidden" v-html="sanitizeHTMLContent(systemSeoByPage.content_description)" />
      </div>

      <div class="flex w-full justify-between py-4">
        <div v-for="category in navigation" :key="category.title" class="w-full flex-1">
          <p class="mb-3 font-semibold text-white">{{ category.title }}</p>
          <div class="flex flex-col gap-2">
            <NuxtLink
              v-for="item in category.subCategories"
              :key="item.link"
              :to="item.link"
              class="flex h-8 items-center gap-2 text-sm text-neutral-100 hover:underline"
              :target="item.newTab ? '_blank' : undefined"
            >
              <div class="relative rounded bg-neutral-600 p-1">
                <div class="absolute-center h-2 w-3 rounded-full bg-black blur-[6px]" />
                <Image :src="item.icon" width="24px" :alt="item.icon" />
              </div>
              <p>
                {{ item.title }}
              </p>
            </NuxtLink>
          </div>
        </div>
      </div>

      <div class="mt-4 flex flex-col items-center justify-center gap-2 border-t border-neutral-700 py-2">
        <p class="text-center text-xs text-neutral-200">{{ footerContent.COPY_RIGHT }}</p>
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

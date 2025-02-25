<script lang="ts" setup>
import AuthDialog from "../auth/AuthDialog.vue";
import { widgetItems } from "./static";

const props = defineProps<{ contacts: IContact[] }>();

const { isLoggedIn } = useCurrentUser();

const authDialogController = useDialog(DialogTypeEnum.LOGIN);

const curSelectedUrl = ref<string>();

const itemList = computed(() => {
  const list = [...widgetItems];
  if (props.contacts) {
    const contactItem = {
      featuredImg: "phone-24.webp",
      alt: "Hỗ trợ",
      title: "Liên hệ hỗ trợ 24/7",
      options: props.contacts.map((el) => ({
        tooltip: el.display_name,
        img: el.img,
        url: el.url,
      })),
    };
    list.push(contactItem);
  }

  return list;
});

const handleOpenUrl = (url?: string) => {
  if (!url) return;

  if (url.startsWith("http")) {
    openInNewTab(url);
    return;
  }

  if (url.startsWith("/account") && !isLoggedIn.value) {
    curSelectedUrl.value = url;
    authDialogController.openDialog();
    return;
  }

  navigateTo(url);
};
</script>

<template>
  <div class="flex flex-wrap justify-center gap-4 min-[1200px]:flex-nowrap min-[1200px]:justify-between">
    <div
      v-for="(item, index) of itemList"
      :key="index"
      class="card-bg relative flex h-[130px] w-[405px] items-center gap-2 pr-12"
    >
      <Image :src="item.featuredImg" :alt="item.alt" width="110px" class="flex-shrink-0" />

      <div>
        <p class="mb-1 text-xl font-semibold">{{ item.title }}</p>
        <div class="flex gap-3">
          <TooltipProvider v-for="option of item.options" :key="option.tooltip" :delay-duration="0">
            <Tooltip>
              <TooltipTrigger>
                <a :href="option.url" @click.prevent="handleOpenUrl(option.url)">
                  <component
                    :is="option.icon"
                    v-if="option.icon"
                    class="trigger-el text-5xl text-[#D6EBFF] hover:fill-secondary-400"
                    filled
                  />

                  <Image v-else-if="option.img" :src="option.img" :alt="option.img" width="32px" class="trigger-el" />
                </a>
              </TooltipTrigger>

              <TooltipContent side="bottom">
                <p>{{ option.tooltip }}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  </div>

  <AuthDialog
    v-if="authDialogController.isOpen.value"
    :controller="authDialogController"
    @login="handleOpenUrl(curSelectedUrl)"
  />
</template>

<style scoped lang="scss">
.card-bg {
  background-image: url("/images/gradient-bg.webp");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  object-fit: contain;
}

.trigger-el:hover {
  filter: brightness(0) saturate(100%) invert(64%) sepia(79%) saturate(1048%) hue-rotate(358deg) brightness(104%)
    contrast(102%);
}
</style>

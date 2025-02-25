<script setup lang="ts">
import { createVipTabs, breadcrumbs } from "~/components/pages/vip/static";

const tabs = createVipTabs();
const currentTab = ref(tabs[0].value);

const authDialogController = useDialog(DialogTypeEnum.LOGIN);
const { isLoggedIn } = useCurrentUser();

const createNewDeposit = () => {
  if (isLoggedIn.value) {
    navigateTo(APP_PATH.DEPOSIT_CODEPAY);
    return;
  }
  authDialogController.openDialog();
};
</script>

<template>
  <VipLayoutDesktop>
    <template #breadcrumb>
      <Breadcrumb :breadcrumbs="breadcrumbs" />
    </template>

    <template #content>
      <Tabs v-model="currentTab">
        <CategoryTabList
          :category-tabs="tabs"
          class="pointer-events-auto flex flex-row justify-start gap-2"
          tab-container-class="rounded-lg bg-neutral-600 px-5 h-10 bg-tab-news-bgInactive"
          tab-content-class="text-base font-normal gap-[6px]"
          icon-class="h-6 w-6"
        />
        <TabsContent v-for="tab in tabs" :key="tab.value" :value="tab.value" class="mt-6">
          <component :is="tab.content">
            <template #action>
              <div class="mt-6 flex items-center justify-center">
                <Button variant="secondary" size="xl" class="h-12 w-[250px] font-bold" @click="createNewDeposit"
                  >Tham Gia Ngay
                </Button>
              </div>
            </template>
          </component>
        </TabsContent>
      </Tabs>
    </template>
  </VipLayoutDesktop>
  <AuthDialog v-if="authDialogController.isOpen.value" :controller="authDialogController" />
</template>

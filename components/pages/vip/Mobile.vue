<script setup lang="ts">
import { createVipTabs } from "~/components/pages/vip/static";

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
  <PageLayoutMobile class="bg-transparent">
    <template #header>
      <PageHeaderMobile title="Chi tiết" show-user-auth />
    </template>

    <template #main>
      <VipLayoutMobile>
        <template #content>
          <Tabs v-model="currentTab">
            <CategoryTabList
              :category-tabs="tabs"
              class="pointer-events-auto flex w-full flex-row justify-start gap-2"
              tab-container-class="rounded-lg bg-neutral-600 px-3 h-9 bg-tab-news-bgInactive [&:nth-child(2)]:px-0 [&:nth-child(2)]:w-full"
              tab-content-class="text-sm font-normal"
            />
            <TabsContent v-for="tab in tabs" :key="tab.value" :value="tab.value" class="mt-4">
              <component :is="tab.content">
                <template #action>
                  <Button
                    class="mt-4 h-12 w-full self-center font-bold"
                    size="xl"
                    variant="secondary"
                    @click="createNewDeposit"
                    >Tham Gia Ngay</Button
                  >
                </template>
              </component>
            </TabsContent>
          </Tabs>
        </template>
      </VipLayoutMobile>
    </template>
  </PageLayoutMobile>
  <AuthDialog v-if="authDialogController.isOpen.value" :controller="authDialogController" />
</template>

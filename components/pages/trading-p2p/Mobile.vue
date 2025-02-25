<script setup lang="ts">
const { isLoading, srcIframe } = useTradingP2P();
const iframe = ref<HTMLIFrameElement | undefined>(undefined);

const { handlePageBack } = useBackNavigation();
const { openSidebarMenu } = useSidebarMenu();

const handleBack = () => {
  openSidebarMenu(SidebarMenuEnum.ACCOUNT_OVERVIEW);
  handlePageBack();
};
</script>

<template>
  <PageLayoutMobile class="min-h-dvh">
    <template #header>
      <PageHeaderMobile title="Mua bán P2P" @back="handleBack()" />
    </template>
    <template #main>
      <div class="w-full">
        <div
          v-if="isLoading"
          class="flex min-h-dvh w-full items-center justify-center rounded-[3px] bg-background-bg-section_main"
        >
          <LoadingSpinner />
        </div>
        <div v-show="!isLoading">
          <div class="relative w-full">
            <div class="z-[1] flex min-h-dvh w-full">
              <div class="w-full">
                <iframe
                  id="iframe"
                  ref="iframe"
                  :src="srcIframe"
                  allow="camera *; geolocation *; microphone *; autoplay *; clipboard-read *; clipboard-write *"
                  frame-id="my-iframe"
                  name="my-frame"
                  class="mt-0 min-h-dvh w-full rounded-none border-none"
                  @load="() => (isLoading = false)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </PageLayoutMobile>
</template>

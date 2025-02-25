<script lang="ts" setup>
const {
  dataHistoryBets,
  listSelectStatus,
  listSelectCategory,
  handleSelectCategory,
  selectedHistoryItem,
  handleSelectStatus,
  fetchMore,
  error,
  status,
} = useHistoryBets();
const { handlePageBack } = useBackNavigation();
const { openSidebarMenu } = useSidebarMenu();

const betHistoryList = ref<HTMLElement>();
useInfiniteScroll(betHistoryList, () => fetchMore(), {
  distance: 10,
  interval: 1000,
});

const handleBack = () => {
  openSidebarMenu(SidebarMenuEnum.ACCOUNT_OVERVIEW);
  handlePageBack();
};
</script>

<template>
  <section>
    <PageLayoutMobile class="min-h-screen">
      <template #header>
        <PageHeaderMobile title="Lịch Sử Cá Cược" @back="handleBack()" />
      </template>
      <template #main>
        <div class="flex justify-normal gap-[10px] p-4">
          <DropdownMenu>
            <DropdownMenuTrigger class="h-[36px] w-[200px] flex-1 rounded-lg border border-input-border">
              <DropdownMenuToggle class="min-w-0 rounded-lg lg:min-h-[34px]">{{
                selectedHistoryItem.titleCategory || "Thể loại"
              }}</DropdownMenuToggle>
            </DropdownMenuTrigger>
            <DropdownMenuContent class="h-max max-h-full bg-neutral-600 py-0">
              <DropdownMenuRadioGroup v-model="selectedHistoryItem.category">
                <DropdownMenuRadioItem
                  v-for="option in listSelectCategory"
                  :key="option.value"
                  :value="option.value"
                  class="max-h-9 min-h-9 bg-background-bg-section_main"
                  @click="handleSelectCategory(option)"
                >
                  {{ option.text }}
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger class="h-[36px] w-[200px] flex-1 rounded-lg border border-input-border">
              <DropdownMenuToggle class="min-w-0 rounded-lg lg:min-h-[34px]">{{
                selectedHistoryItem.titleStatus || "Trạng thái"
              }}</DropdownMenuToggle>
            </DropdownMenuTrigger>
            <DropdownMenuContent class="h-max max-h-full bg-neutral-600 py-0">
              <DropdownMenuRadioGroup v-model="selectedHistoryItem.status">
                <DropdownMenuRadioItem
                  v-for="option in listSelectStatus"
                  :key="option.value"
                  :value="option.value"
                  class="max-h-9 min-h-9 bg-background-bg-section_main"
                  @click="handleSelectStatus(option)"
                >
                  {{ option.text }}
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div ref="betHistoryList" class="p-4 pt-0">
          <template v-if="status === 'pending'">
            <LoadingSpinner class="absolute flex h-full w-full items-center justify-center" />
          </template>

          <template v-else-if="error || !dataHistoryBets?.length">
            <div class="relative mt-[60px]">
              <HistoryEmpty class="flex-1" :class-image="'text-[93px]'" />
            </div>
          </template>

          <template v-if="status === 'success' && dataHistoryBets">
            <div
              v-for="history in dataHistoryBets"
              :key="history.id"
              class="relative mb-3 flex h-[81px] items-center gap-2 rounded-lg bg-history-bgReject p-2 last:mb-0"
            >
              <div class="max-h-6 min-h-6 min-w-6 max-w-6">
                <component :is="history.icon" class="min-h-6 min-w-6" />
              </div>

              <div class="flex flex-col gap-[6px]">
                <p
                  class="flex items-center gap-1 overflow-hidden text-ellipsis whitespace-nowrap text-xs font-normal text-neutral-200"
                >
                  {{ BetLabel.PLAY }}
                  <span
                    class="inline-block max-w-[130px] overflow-hidden text-ellipsis whitespace-nowrap text-xs font-normal text-secondary"
                  >
                    {{ history?.title }}
                  </span>
                </p>
                <p class="text-xs font-normal text-neutral-200">
                  {{ BetLabel.BET + " " + history?.amount }}
                </p>
                <div class="text-sm font-normal text-secondary">{{ history?.win_loss }}</div>
              </div>

              <div class="ml-auto flex flex-col items-end gap-1">
                <div class="flex items-center justify-end gap-1 text-xs font-normal text-neutral-200">
                  <span>{{ history.id }}</span>
                  <ButtonCopy :copy-text="history.id || ''" />
                </div>
                <p class="text-xs font-normal text-neutral-300">{{ history?.time }}</p>
                <div
                  class="flex h-6 items-center justify-center rounded-[8px] px-2 py-[2px] text-[14px] font-medium leading-5"
                  :data-value="`${history?.status_class}`"
                >
                  <span
                    :class="
                      cn(
                        (history?.status_class === 'bet-win' ||
                          history?.status_class === 'bet-half-won' ||
                          history?.status_class === 'bet-refund' ||
                          history?.status_class === 'tip') &&
                          'text-history-finished',
                        (history?.status_class === 'bet-lose' || history?.status_class === 'bet-half-lose') &&
                          'text-history-cancel',
                        (history?.status_class === 'bet-cancel' || history?.status_class === 'bet-reject') &&
                          'text-disable',
                        history?.status_class === 'bet-draw' ||
                          (history?.status_class === 'bet-running' && 'text-history-processing'),
                      )
                    "
                  >
                    {{ history?.status }}
                  </span>
                </div>
              </div>
            </div>
          </template>
        </div>
      </template>
    </PageLayoutMobile>
  </section>
</template>
<style lang="scss" scoped>
div {
  &[data-value="bet-win"] {
    @apply bg-history-bgFinished;
  }
  &[data-value="bet-lose"] {
    @apply bg-history-bgCancel;
  }
  &[data-value="bet-running"] {
    @apply bg-history-bgProcessing;
  }
  &[data-value="bet-reject"] {
    @apply bg-history-bgReject;
  }
}
</style>

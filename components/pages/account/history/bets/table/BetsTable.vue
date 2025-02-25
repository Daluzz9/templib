<script lang="ts" setup>
import { BetsTableHeads } from "@/components/pages/account/history/history-static";
const {
  dataHistoryBets,
  listSelectStatus,
  listSelectCategory,
  handleSelectCategory,
  selectedHistoryItem,
  handleSelectStatus,
  currentPage,
  showPerPage,
  totalItem,
  onCategoryPageChanged,
  error,
  status,
} = useHistoryBets();
const betHistoryList = ref<HTMLElement>();

const handleConvertStatusClass = (statusClass: string) => {
  const classMap: Record<string, string> = {
    "bet-win": "text-history-finished",
    "bet-half-won": "text-history-finished",
    "bet-refund": "text-history-finished",
    tip: "text-history-finished",

    "bet-lose": "text-history-cancel",
    "bet-half-lose": "text-history-cancel",

    "bet-cancel": "text-disable",
    "bet-reject": "text-disable",

    "bet-draw": "text-history-processing",
    "bet-running": "text-history-processing",
    "bet-processing": "text-history-processing",
  };

  return classMap[statusClass] || "";
};
</script>

<template>
  <section>
    <div class="mb-5 flex items-center justify-between">
      <div class="text-sm text-text-secondary">{{ BetLabel.HISTORY_BETS }}</div>
      <div class="flex justify-normal gap-[10px]">
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
          <DropdownMenuContent class="h-max max-h-full rounded-lg bg-background-bg-section_main py-0">
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
    </div>

    <div class="min-h-[384px] text-[14px] font-normal leading-[20px]">
      <div
        class="grid h-[40px] grid-cols-[120px_1fr_140px_170px_170px_104px] items-center gap-x-[40px] rounded-[8px_8px_0_0] rounded-t-[8px] border-l border-r border-t border-solid border-border-primary bg-background-bg-secondary px-4 py-[6px]"
      >
        <div
          v-for="(bet, index) in BetsTableHeads"
          :key="index"
          :class="[
            'whitespace-nowrap text-[14px] font-semibold leading-[20px] text-text-primary',
            { 'text-right': ['Số tiền cược', 'Thắng/Thua'].includes(bet) },
            { 'text-center': bet === 'Trạng thái' },
          ]"
        >
          {{ bet }}
        </div>
      </div>

      <div
        ref="betHistoryList"
        class="relative max-h-[490px] min-h-[384px] overflow-y-auto rounded-[0_0_8px_8px] border border-border-primary"
      >
        <template v-if="status === 'pending'">
          <LoadingSpinner class="absolute flex h-full w-full items-center justify-center" />
        </template>

        <template v-else-if="error || !dataHistoryBets?.length">
          <div class="list-transaction-empty absolute left-2/4 top-2/4 m-auto -translate-x-2/4 -translate-y-2/4">
            <HistoryEmpty class="flex-1" :class-image="'h-25 w-25'" />
          </div>
        </template>

        <template v-if="status === 'success' && dataHistoryBets">
          <div
            v-for="(history, index) in dataHistoryBets"
            :id="`item-transaction-bet-${index + 1}`"
            :key="index"
            class="grid h-[68px] cursor-pointer grid-cols-[120px_1fr_140px_170px_170px_104px] items-center gap-[40px] whitespace-nowrap border-b border-border-primary px-4 py-4 text-[14px] font-normal leading-[20px] text-primary transition-all duration-300 hover:bg-background-bg-secondary"
          >
            <div class="bet-id">{{ history?.id }}</div>
            <div class="flex items-center">
              <div class="icon">
                <component :is="history?.icon" class="text-2xl" />
              </div>
              <span class="w-full overflow-hidden text-ellipsis whitespace-nowrap pl-3">{{ history?.title }}</span>
            </div>
            <div class="time">{{ history?.time }}</div>
            <div class="amount text-end">{{ history?.amount }}</div>
            <div class="justify-end text-end">{{ history?.win_loss }}</div>
            <div
              class="flex h-9 w-[104px] items-center justify-center rounded-[8px] px-3 py-1 text-[14px] font-medium leading-5"
              :data-value="`${history?.status_class}`"
            >
              <span :class="handleConvertStatusClass(history?.status_class)">
                {{ history?.status }}
              </span>
            </div>
          </div>
        </template>
      </div>

      <Pagination
        v-if="totalItem > showPerPage"
        class="mt-4 flex justify-center"
        :total="totalItem"
        :items-per-page="showPerPage"
        :default-page="currentPage"
        @update:page="onCategoryPageChanged"
      />
    </div>
  </section>
</template>
<style lang="scss" scoped>
::-webkit-scrollbar {
  width: 5px;
  background: transparent;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background-color: #585e66;
  border-radius: 8px;
}

div {
  &[data-value="bet-win"] {
    @apply bg-history-bgFinished;
  }
  &[data-value="bet-lose"] {
    @apply bg-history-bgCancel;
  }
  &[data-value="bet-processing"] {
    @apply bg-history-bgProcessing;
  }
  &[data-value="bet-running"] {
    @apply bg-history-bgProcessing;
  }
  &[data-value="bet-reject"] {
    @apply bg-history-bgReject;
  }
}
</style>

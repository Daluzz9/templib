<script lang="ts" setup>
import { TransactionTableHeads } from "@/components/pages/account/history/history-static";
const { dataTransactionHistory, error, status } = useHistoryTransactions();
const {
  getTransactionsDetail,
  dataHistory,
  dataAmount,
  titleDetail,
  statusTransaction,
  actionHistory,
  transactionType,
  statementImgUrl,
  methodDeposit,
  dataCardSerial,
  cardProvider,
} = useHistoryDetailTransactions();
const transactionDialogController = useDialog();
const router = useRouter();
const route = useRoute();
const dialogDetailWithdrawCardController = useDialog();

const handleDetailHistory = async (id: string) => {
  await getTransactionsDetail(id);
  router.push({
    query: { ...route.query, id: id },
  });
  if (dataHistory.value) {
    transactionDialogController.openDialog();
  }
};

onMounted(async () => {
  if (route.query.id) {
    await getTransactionsDetail(route.query.id as string);
    if (dataHistory.value) {
      transactionDialogController.openDialog();
    }
  }
});
</script>

<template>
  <section>
    <div class="min-h-[384px] rounded-[8px] border border-border-primary text-[14px] font-normal leading-[20px]">
      <div>
        <div
          class="grid h-[40px] grid-cols-[1fr_120px_160px_200px_104px_20px] items-center gap-x-[40px] rounded-t-[8px] bg-background-bg-secondary px-6 py-[6px]"
        >
          <div
            v-for="transaction in TransactionTableHeads"
            :key="transaction"
            :class="[
              'whitespace-nowrap text-[14px] font-semibold leading-[20px] text-[--text-text-primary]',
              { 'text-right': transaction === 'Số tiền' },
              { 'text-center': transaction === 'Trạng thái' },
            ]"
          >
            {{ transaction }}
          </div>
        </div>
      </div>

      <div class="relative max-h-[490px] min-h-[384px] overflow-y-auto rounded-b-lg">
        <template v-if="status === 'pending'">
          <LoadingSpinner class="absolute flex h-full w-full items-center justify-center" />
        </template>
        <template v-else-if="error || !dataTransactionHistory?.length">
          <div class="list-transaction-empty absolute left-2/4 top-2/4 m-auto -translate-x-2/4 -translate-y-2/4">
            <HistoryEmpty class="flex-1" />
          </div>
        </template>
        <template v-if="status === 'success' && dataTransactionHistory">
          <template v-if="dataTransactionHistory">
            <NuxtLink
              v-for="(history, index) in dataTransactionHistory"
              :id="`item-transaction-bet-${index + 1}`"
              :key="history.id"
              class="grid h-[69px] cursor-pointer grid-cols-[1fr_120px_160px_200px_104px_20px] items-center gap-[40px] whitespace-nowrap border-b border-border-primary px-6 py-4 text-[14px] font-normal leading-[20px] text-primary transition-all duration-300 hover:bg-background-bg-secondary"
              @click="handleDetailHistory(history.id.toString())"
            >
              <div class="flex items-center gap-x-2">
                <div class="flex items-center justify-center">
                  <component :is="history?.icon" class="text-2xl" />
                </div>
                <span>{{ history?.title }}</span>
              </div>
              <div>{{ history?.type }}</div>
              <div>{{ history?.time }}</div>
              <div class="text-right">{{ history?.amount || 0 }}</div>
              <div
                :class="`flex min-h-[36px] w-[104px] items-center justify-center rounded-[8px] bg-[--colors-alpha-white-05dp] px-3 py-1 text-[14px] font-medium leading-[20px]`"
                :data-value="history?.status_class"
              >
                <span :class="`text-history-${history?.status_class}`" :data-value="history?.status_class">
                  {{ history?.status }}
                </span>
              </div>
              <div class="flex h-5 w-5 items-center justify-center">
                <span class="icon-arrow-right text-[10px] text-text-placeholder" />
                <SvgoArrow class="rotate-360 ml-auto text-3xl text-neutral-50 transition" />
              </div>
            </NuxtLink>
          </template>
        </template>
      </div>
    </div>
  </section>
  <DialogHistory
    v-if="transactionDialogController.isOpen.value"
    :controller="transactionDialogController"
    :detail-transaction="{
      dataHistory,
      dataAmount,
      titleDetail,
      statusTransaction,
      actionHistory,
      transactionType,
      statementImgUrl,
      methodDeposit,
      dataCardSerial,
      cardProvider,
    }"
    @open-dialog-detail-withdraw-card="dialogDetailWithdrawCardController.openDialog()"
  />
  <DialogDetailWithdrawCard
    v-if="dialogDetailWithdrawCardController.isOpen.value"
    :controller="dialogDetailWithdrawCardController"
    :data-card-serial="dataCardSerial || []"
    :card-provider="cardProvider || ''"
  />
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
  &[data-value="finished"] {
    @apply bg-history-bgFinished;
  }
  &[data-value="cancel"] {
    @apply bg-history-bgCancel;
  }
  &[data-value="processing"] {
    @apply bg-history-bgProcessing;
  }
}

span {
  &[data-value="finished"] {
    @apply text-history-finished;
  }
  &[data-value="cancel"] {
    @apply text-history-cancel;
  }
  &[data-value="processing"] {
    @apply text-history-processing;
  }
}
</style>

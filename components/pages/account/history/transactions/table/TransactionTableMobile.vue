<script lang="ts" setup>
const { dataTransactionHistory, error, status } = useHistoryTransactions();
const { handlePageBack } = useBackNavigation();
const { openSidebarMenu } = useSidebarMenu();

const handleBack = () => {
  openSidebarMenu(SidebarMenuEnum.ACCOUNT_OVERVIEW);
  handlePageBack();
};

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
    <PageLayoutMobile class="min-h-screen">
      <template #header>
        <PageHeaderMobile title="Lịch Sử Giao Dịch" @back="handleBack()" />
      </template>

      <template #main>
        <div>
          <div ref="transactionHistoryList" class="p-4">
            <template v-if="status === 'pending'">
              <LoadingSpinner class="absolute flex h-full w-full items-center justify-center" />
            </template>

            <template v-else-if="error || !dataTransactionHistory?.length">
              <div class="relative mt-[60px]">
                <HistoryEmpty class="flex-1" :class-image="'h-[93px] w-[93px]'" />
              </div>
            </template>

            <template v-if="status === 'success' && dataTransactionHistory">
              <div
                v-for="(history, index) in dataTransactionHistory"
                :key="index"
                class="relative mb-3 flex h-20 items-center gap-2 rounded-lg bg-history-bgReject p-2 last:mb-0"
                @click="handleDetailHistory(history.id.toString())"
              >
                <div class="flex w-6 items-center justify-center">
                  <component :is="history.icon" class="min-h-6 w-6 min-w-6" />
                </div>

                <div class="flex flex-1 flex-col gap-1">
                  <div class="text-sm font-medium text-primary">
                    {{ history.title }}
                  </div>
                  <p class="text-xs font-normal text-text-secondary">
                    {{ history?.type }}
                  </p>
                  <div class="text-sm font-normal text-text-money">
                    {{ history.amount ? history.amount : 0 }}
                  </div>
                </div>

                <div class="flex flex-col items-end gap-1 whitespace-nowrap">
                  <div class="text-sm font-normal text-neutral-300">
                    {{ history.time }}
                  </div>
                  <div
                    class="flex min-h-[28px] items-center justify-center rounded-lg bg-secondary px-2 py-0.5 text-sm font-normal"
                    :data-value="history?.status_class"
                  >
                    <span :data-value="history?.status_class">{{ history.status }}</span>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </template>
    </PageLayoutMobile>
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

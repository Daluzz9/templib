<script setup lang="ts">
type IProps = {
  controller: IUseDialog;
  detailTransaction: {
    dataHistory: IDetailType[] | undefined;
    dataAmount: string;
    titleDetail: string;
    statusTransaction: string;
    actionHistory: string;
    transactionType: string;
    statementImgUrl: string;
    methodDeposit: string;
    dataCardSerial: Array<{ pincode: string; serial: string }> | undefined;
    cardProvider: IProviderType | undefined;
  };
};
const { fetchContacts, contacts } = useContact();

await useAsyncData(async () => {
  await fetchContacts();
  return {};
});
const {
  isShowButtonCopy,
  setContentTooltip,
  handleChangeFile,
  statement_img,
  contentTooltip,
  fillColor,
  isTooltipVisible,
  hideTooltip,
} = useDialogHistory();

const emit = defineEmits(["open-dialog-detail-withdraw-card"]);
const props = defineProps<IProps>();

const livechatUrl = computed(() => contacts.value.find((contact: IContact) => contact.name === "livechat")?.url || "");

const handleShowDetailCards = () => {
  props.controller.closeDialog();
  emit("open-dialog-detail-withdraw-card");
};
</script>

<template>
  <Dialog :controller="controller" :type="DialogTypeEnum.DETAIL_HISTORY" class="dialog-history">
    <DialogTrigger as-child>
      <slot name="trigger" />
    </DialogTrigger>
    <DialogContent
      class="dialog-history__content bg-transparent max-h-[90vh] overflow-auto sm:max-w-[425px]"
      close-class="h-7 top-[14px] right-[14px]"
    >
      <div>
        <div class="relative rounded-[12px] bg-background-bg-section_main">
          <div class="rounded-[12px]">
            <div class="py-4 text-center text-base font-semibold text-neutral-50">Chi tiết giao dịch</div>
          </div>
          <div
            class="amount pb-4 text-center text-[24px] font-bold leading-[32px]"
            :data-value="detailTransaction.statusTransaction"
          >
            {{ detailTransaction.dataAmount }}
          </div>
          <div class="flex justify-between px-4 py-1 pb-2 sm:px-6">
            <div class="text-sm font-normal text-text-secondary">Trạng thái</div>
            <div
              class="status flex min-h-[36px] w-[104px] items-center justify-center rounded-[8px]"
              :data-value="detailTransaction.statusTransaction"
            >
              <span :data-value="detailTransaction.statusTransaction">{{
                detailTransaction.dataHistory?.[0]?.value
              }}</span>
            </div>
          </div>
          <div
            class="absolute bottom-0 left-1/2 h-[1px] w-[calc(100%_-_48px)] -translate-x-1/2 bg-border-primary px-24 opacity-50"
          ></div>
        </div>

        <div class="relative rounded-t-[12px] bg-background-bg-section_main py-2">
          <div class="relative rounded-t-[12px]">
            <div
              v-for="(item, index) in detailTransaction?.dataHistory?.slice(1) ?? []"
              :key="index"
              class="flex w-full items-center justify-between rounded-t-[12px] bg-background-bg-section_main px-4 py-[11px] sm:px-6"
            >
              <div class="text-sm font-normal text-text-secondary">{{ item.label }}</div>
              <div
                class="flex max-w-[274px] items-center justify-center gap-2 break-all text-end text-sm font-semibold text-text-primary"
              >
                <NuxtLink
                  v-if="item?.field === 'link-crypto' && detailTransaction.statusTransaction === 'finished'"
                  class="text-sm font-normal text-primary-300 underline"
                  :to="item?.value.toString()"
                  target="_blank"
                  >{{ MappedTransactionHistoryLabelEnum.WATCH_TRANSACTION }}</NuxtLink
                >
                <span v-else-if="item.field === 'wallet'">
                  <span class="text-warning">{{ item?.value.toString().slice(0, 4) }}</span
                  >{{ item?.value.toString().slice(4, -4)
                  }}<span class="text-warning">{{ item?.value.toString().slice(-4) }}</span>
                </span>
                <div v-else :to="item?.value.toString()" target="_blank" class="break-normal">{{ item?.value }}</div>
                <div
                  v-if="isShowButtonCopy(item?.field?.toString() ?? '') && item?.value !== '-'"
                  class="group relative inline-block hover:cursor-pointer"
                  @mouseenter="isTooltipVisible[item?.field?.toString() ?? ''] = true"
                  @mouseleave="hideTooltip(item?.field?.toString() ?? '')"
                >
                  <ButtonCopy
                    :copy-text="item?.value.toString()"
                    is-filled
                    :class-icon-copy="fillColor[item?.field?.toString() ?? '']"
                    :class-button="isTooltipVisible[item?.field?.toString() ?? ''] ? 'pointer-events-none' : ''"
                    @copy="setContentTooltip(item?.field?.toString() ?? '', 'Đã Copy')"
                  />
                  <div
                    v-show="isTooltipVisible[item?.field?.toString() ?? '']"
                    class="absolute inset-y-0 left-[0] min-h-[28px] flex-col items-center justify-center p-0 group-hover:flex group-hover:opacity-100"
                  >
                    <div
                      class="absolute -right-5 top-[-37px] z-[99] flex h-7 w-max items-center justify-center gap-2.5 rounded bg-primary px-2 py-1 transition-all"
                    >
                      <span class="text-sm text-text-tooltip">{{
                        contentTooltip[item?.field?.toString() ?? ""] || "Nhấn để Copy"
                      }}</span>
                    </div>
                    <div
                      class="absolute -left-2 -top-3 left-0.5 h-0 w-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-primary"
                    />
                  </div>
                </div>
                <div
                  v-if="item?.field === TransactionFieldDetailEnum.AMOUNT && detailTransaction?.dataCardSerial"
                  class="cursor-pointer text-sm font-[500] text-primary-300 underline"
                  @click="handleShowDetailCards()"
                >
                  {{ MappedTransactionHistoryLabelEnum.SEE_MORE }}
                </div>
              </div>
            </div>
          </div>
          <div
            class="absolute bottom-0 left-1/2 h-[1px] w-[calc(100%_-_48px)] -translate-x-1/2 bg-border-primary px-24 opacity-50"
          ></div>
        </div>
        <div
          v-if="
            detailTransaction?.dataHistory?.[0]?.classStatus &&
            !['cancel', 'finished'].includes(detailTransaction.dataHistory[0].classStatus) &&
            detailTransaction?.methodDeposit === 'nicepay' &&
            detailTransaction.transactionType !== TransactionHistoryTypeEnum.COMMISSION &&
            detailTransaction.transactionType !== TransactionHistoryTypeEnum.PROMOTION
          "
          class="bg-background-bg-section_main px-4 py-2 pt-4 sm:px-6"
        >
          <InputUploadFile
            id="statement_img_details"
            :id-transaction="detailTransaction?.dataHistory?.[1]?.value?.toString() ?? ''"
            name="statement_img_details"
            label-type="input"
            file-browse-text="Đính Kèm"
            placeholder="Biên lai '.jpg'; '.jpeg'; '.png' < 5 MB"
            :accept-type="['.jpeg', '.png', '.jpg']"
            :limit-file-size="10485760"
            @change-file="handleChangeFile"
          />
        </div>
        <div
          v-if="detailTransaction?.statementImgUrl || statement_img"
          class="flex items-center justify-center bg-background-bg-section_main p-2 px-4 sm:px-6"
        >
          <div
            class="flex w-full items-center justify-center rounded-lg border border-border-primary bg-background-bg-section_main py-2"
          >
            <Image
              v-if="statement_img"
              :show-default="true"
              img-class="h-[140px]"
              class="bill"
              alt=""
              :src="statement_img"
            />
            <Image
              v-else-if="detailTransaction?.statementImgUrl"
              :src="detailTransaction?.statementImgUrl"
              :show-default="true"
              alt="bill"
              img-class="h-[140px]"
            />
          </div>
        </div>
        <NuxtLink
          :to="livechatUrl"
          class="block bg-background-bg-section_main py-2 text-center text-sm font-semibold text-primary-300 underline"
          target="_blank"
        >
          {{ MappedTransactionHistoryLabelEnum.CONTACT }}
        </NuxtLink>

        <DialogFooter>
          <div
            :class="
              cn('h-3 w-full -translate-y-[3px] bg-[url(/images/account/tail.webp)] bg-contain bg-center bg-no-repeat')
            "
          ></div>
        </DialogFooter>
      </div>
    </DialogContent>
  </Dialog>
</template>
<style lang="scss" scoped>
.status {
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

span,
.amount {
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

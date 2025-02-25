<script setup lang="ts">
type IProps = {
  controller: IUseDialog;
  dataCardSerial: Array<{ pincode: string; serial: string }>;
  cardProvider: string;
};
const { fetchContacts, contacts } = useContact();

await useAsyncData(async () => {
  await fetchContacts();
  return {};
});
const props = defineProps<IProps>();
const tooltipStates = ref<Record<string, { content: string; fillColor: string }>>({});
const timeouts = ref<Record<string, ReturnType<typeof useTimeoutFn>>>({});
const tooltipVisible = ref<Record<string, boolean>>({});

const livechatUrl = computed(() => contacts.value.find((contact: IContact) => contact.name === "livechat")?.url || "");

const handleBack = () => {
  props.controller.closeDialog();
};

const hideTooltip = (key: string) => {
  tooltipVisible.value[key] = false;
};

const setContentTooltip = (text: string, key: string) => {
  tooltipVisible.value[key] = true;
  tooltipStates.value[key] = {
    content: text,
    fillColor: "text-disable",
  };

  if (timeouts.value[key]) {
    timeouts.value[key].stop();
  }

  timeouts.value[key] = useTimeoutFn(() => {
    tooltipVisible.value[key] = false;
    tooltipStates.value[key] = {
      content: "Nhấn để Copy",
      fillColor: "text-secondary-foreground",
    };
  }, 3000);
};
</script>

<template>
  <Dialog :controller="controller" :type="DialogTypeEnum.DETAIL_WITHDRAW_CARD" class="dialog-history">
    <DialogTrigger as-child>
      <slot name="trigger" />
    </DialogTrigger>
    <DialogContent class="dialog-history__content bg-transparent rounded-[0]" close-class="h-7 top-[14px] right-[14px]">
      <div class="relative rounded-t-xl">
        <div class="absolute left-2 top-3.5 h-8 w-8 cursor-pointer" @click="handleBack()">
          <BaseImg src="/assets/images/components/mobile/icon-back.svg" alt="icon-back" class="w-full" />
        </div>

        <div
          class="h-[56px] rounded-[0] border-b border-[#FFFFFF1A] bg-background-popup-header px-4 py-4 text-start text-base font-semibold capitalize text-primary sm:h-[60px] sm:text-center sm:text-xl"
        >
          {{ MappedTransactionHistoryLabelEnum.CARD }}
        </div>

        <div class="relative max-h-[594px] overflow-y-auto bg-[#292d30] px-6 pt-3">
          <div v-for="(item, index) in dataCardSerial" :key="item.serial" class="last:mb-4">
            <div class="mb-3 flex items-center gap-1 text-sm font-semibold">
              <span class="translate-y-[1px] text-primary">{{ index + 1 }}.</span>
              <Image
                :src="`/account/card/${cardProvider.toLowerCase()}.webp`"
                alt="empty-bank"
                width="93px"
                hright="24px"
              />
            </div>

            <div class="mb-6 rounded-lg bg-background-bg-secondary p-2 px-3">
              <div class="mb-2 flex items-center justify-between text-sm last:mb-0">
                <div class="flex flex-col">
                  <div class="mr-1.5 w-[50px] font-normal text-neutral-200">
                    {{ MappedTransactionHistoryLabelEnum.ID_CARD }}
                  </div>
                  <div
                    class="mr-2 overflow-hidden text-ellipsis whitespace-nowrap text-right font-semibold text-primary"
                  >
                    {{ item?.pincode }}
                  </div>
                </div>
                <div class="flex items-center">
                  <div
                    class="group relative inline-block hover:cursor-pointer"
                    @mouseenter="tooltipVisible[item.pincode] = true"
                    @mouseleave="hideTooltip(item.pincode)"
                  >
                    <ButtonCopy
                      :copy-text="item?.pincode"
                      is-filled
                      :class-icon-copy="tooltipStates[item.pincode]?.fillColor || 'text-secondary-foreground'"
                      @copy="setContentTooltip('Đã Copy', item.pincode)"
                    />
                    <div
                      v-show="tooltipVisible[item.pincode]"
                      class="absolute inset-y-0 left-[0] min-h-[28px] flex-col items-center justify-center p-0 group-hover:flex group-hover:opacity-100"
                    >
                      <div
                        class="absolute -right-5 top-[-37px] z-[99] flex h-7 w-max items-center justify-center gap-2.5 rounded bg-primary px-2 py-1 transition-all"
                      >
                        <span class="text-sm text-text-tooltip">
                          {{ tooltipStates[item.pincode]?.content || "Nhấn để Copy" }}
                        </span>
                      </div>
                      <div
                        class="absolute -left-2 -top-3 left-0.5 h-0 w-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-primary"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex items-center justify-between text-sm">
                <div class="flex flex-col">
                  <div class="mr-1.5 w-[50px] font-normal text-neutral-200">
                    {{ MappedTransactionHistoryLabelEnum.SERI_NUMBER }}
                  </div>
                  <div
                    class="mr-2 overflow-hidden text-ellipsis whitespace-nowrap text-right font-semibold text-primary"
                  >
                    {{ item?.serial }}
                  </div>
                </div>
                <div class="flex items-center">
                  <div
                    class="group relative inline-block hover:cursor-pointer"
                    @mouseenter="tooltipVisible[item.serial] = true"
                    @mouseleave="hideTooltip(item.serial)"
                  >
                    <ButtonCopy
                      :copy-text="item?.serial"
                      is-filled
                      :class-icon-copy="tooltipStates[item.serial]?.fillColor || 'text-secondary-foreground'"
                      @copy="setContentTooltip('Đã Copy', item.serial)"
                    />
                    <div
                      v-show="tooltipVisible[item.serial]"
                      class="absolute inset-y-0 left-[0] min-h-[28px] flex-col items-center justify-center p-0 group-hover:flex group-hover:opacity-100"
                    >
                      <div
                        class="absolute -right-5 top-[-37px] z-[99] flex h-7 w-max items-center justify-center gap-2.5 rounded bg-primary px-2 py-1 transition-all"
                      >
                        <span class="text-sm text-text-tooltip">
                          {{ tooltipStates[item.serial]?.content || "Nhấn để Copy" }}
                        </span>
                      </div>
                      <div
                        class="absolute -left-2 -top-3 left-0.5 h-0 w-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-primary"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="-mt-1 h-px w-full bg-[rgba(255,255,255,0.1)]" />

          <div class="my-2 text-center">
            <NuxtLink
              :to="livechatUrl"
              class="block cursor-pointer text-sm font-semibold text-primary-300 underline"
              target="_blank"
            >
              {{ MappedTransactionHistoryLabelEnum.CONTACT }}
            </NuxtLink>
          </div>
        </div>

        <DialogFooter>
          <div
            :class="
              cn('h-3 w-full translate-y-[-3px] bg-[url(/images/account/tail.webp)] bg-contain bg-center bg-no-repeat')
            "
          ></div>
        </DialogFooter>
      </div>
    </DialogContent>
  </Dialog>
</template>

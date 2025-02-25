<script lang="ts" setup>
import QrcodeVue from "qrcode.vue";
import { TooltipArrow, TooltipPortal, TooltipRoot } from "radix-vue";
const {
  cryptoNetwork,
  getLinkScan,
  formattedWalletAddress,
  currencies,
  changeCryptoNetwork,
  handleDownloadQRCode,
  qrcode,
  systemPlan,
  hasJoinPromotion,
  amountRolling,
} = useDepositCrypto();

const { openSidebarMenu } = useSidebarMenu();

const { handlePageBack } = useBackNavigation();
const tooltip = ref<string>("Nhấn để Copy");
const openTooltip = ref<boolean>(false);

// After 3s close tooltip
const { start, stop } = useTimeoutFn(() => {
  openTooltip.value = false;
}, 3000);

watch(openTooltip, (newVal: boolean) => {
  if (newVal === true) {
    stop();
    start();
  }
});

const handleBack = () => {
  openSidebarMenu(SidebarMenuEnum.ACCOUNT_DEPOSIT);
  handlePageBack();
};
</script>

<template>
  <ClientOnly>
    <section>
      <PageLayoutMobile class="min-h-dvh">
        <template #header>
          <PageHeaderMobile title="Nạp Qua Tiền Ảo" @back="handleBack()" />
        </template>

        <template #main>
          <div class="flex flex-col">
            <div class="p-4 pb-5">
              <BlockDeposit
                v-if="systemPlan && hasJoinPromotion"
                :plan="systemPlan"
                :show-button="false"
                class="mb-5 w-full"
                @cancel-promotion="() => {}"
              >
                <template #rolling>
                  <p>
                    Tiền nạp sẽ được cộng vào doanh thu tiền cược hiện tại
                    <span class="text-warning"
                      >{{
                        formatVNDCurrency(amountRolling / RATE_K_VND, {
                          currencySymbol: CurrencySymbolEnum.NONE,
                        })
                      }}K</span
                    >
                  </p>
                </template>
              </BlockDeposit>
              <div class="mb-2 h-5 text-sm font-semibold leading-tight text-primary">Chọn mạng lưới</div>
              <NetworkCrypto :currencies="currencies" is-deposit @change-network="changeCryptoNetwork">
                <template #nameNetwork="{ item }">
                  <p>{{ `${item.token}` }}</p>
                  <p>{{ `${item.network[0]}` }}</p>
                </template>
              </NetworkCrypto>
            </div>

            <div class="inline-flex h-[452px] w-full flex-col items-center justify-start gap-2 px-4">
              <div class="inline-flex items-center justify-between self-stretch">
                <div class="flex shrink grow basis-0 items-center justify-start gap-2 self-stretch">
                  <div
                    class="h-5 shrink grow basis-0 text-sm font-semibold leading-tight tracking-[-0.5px] text-primary"
                  >
                    Quét mã hoặc chuyển tiền
                  </div>
                </div>
              </div>
              <div
                class="flex h-[424px] flex-col items-center justify-start gap-2 self-stretch overflow-hidden rounded-lg"
              >
                <div
                  class="flex h-[400px] flex-col items-center justify-start gap-2 self-stretch rounded-lg bg-white/5 p-2"
                >
                  <div class="inline-flex w-[343px] items-center justify-center gap-1">
                    <div class="flex items-center justify-end gap-0.5">
                      <div class="text-right text-sm font-normal leading-tight text-primary">
                        1 {{ cryptoNetwork?.token }} ≈ {{ formatVNDCurrency(cryptoNetwork?.buy_price) }}
                      </div>
                    </div>
                  </div>
                  <div class="w-full">
                    <div ref="qrcode" class="flex flex-col items-center justify-center">
                      <QrcodeVue
                        id="qr-crypto"
                        :value="cryptoNetwork.wallet_address"
                        level="H"
                        :size="168"
                        :margin="2"
                        class="mx-auto mb-2 rounded-lg"
                      />
                      <div
                        class="mx-auto mb-2 inline-flex h-8 w-[80px] cursor-pointer items-center justify-center gap-1 overflow-hidden rounded-lg border border-border-tertiary bg-neutral-600 px-3 py-1"
                      >
                        <div
                          id="download-crypto-btn"
                          class="whitespace-nowrap text-center text-[12px] font-medium leading-tight text-white"
                          @click="handleDownloadQRCode"
                        >
                          Tải mã QR
                        </div>
                      </div>
                    </div>

                    <div
                      class="inline-flex h-[80px] w-full flex-col items-start justify-start gap-1 rounded-lg bg-background-bg-secondary p-2"
                    >
                      <span class="h-5 text-sm font-normal leading-tight text-primary">Địa chỉ ví</span>
                      <div class="inline-flex h-7 items-center justify-between gap-2 self-stretch">
                        <NuxtLink
                          class="wallet-link"
                          :to="`${getLinkScan(cryptoNetwork)}${cryptoNetwork.wallet_address}`"
                          target="_blank"
                        >
                          <p
                            v-if="cryptoNetwork.wallet_address && cryptoNetwork.wallet_address.length >= 8"
                            class="mt-1 max-w-[220px] text-sm font-normal leading-tight text-primary"
                          >
                            <span class="text-sm font-normal leading-tight text-primary-300">
                              {{ formattedWalletAddress?.prefix }}
                            </span>
                            <span class="break-words text-sm font-normal leading-tight">
                              {{ formattedWalletAddress?.content }}
                            </span>
                            <span class="text-sm font-normal leading-tight text-primary-300">
                              {{ formattedWalletAddress?.suffix }}
                            </span>
                          </p>
                          <p v-else class="text-sm font-normal leading-tight text-primary">
                            {{ formattedWalletAddress?.full }}
                          </p>
                        </NuxtLink>
                        <TooltipProvider :disable-closing-trigger="true" :delay-duration="200">
                          <TooltipRoot :delay-duration="200" :open="openTooltip">
                            <TooltipTrigger as-child>
                              <ButtonCopy
                                :copy-text="cryptoNetwork.wallet_address || ''"
                                is-button-copy
                                @copy="tooltip = 'Đã Copy'"
                                @click="openTooltip = true"
                              />
                            </TooltipTrigger>
                            <TooltipPortal>
                              <TooltipContent
                                class="z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-sm text-neutral-600 text-primary-foreground animate-in fade-in-0 zoom-in-95"
                                side="top"
                                :side-offset="5"
                                class-image="fill-primary"
                              >
                                <span class="text-sm font-normal text-neutral-600">{{ tooltip }}</span>
                                <TooltipArrow class="fill-primary" :width="8" filled />
                              </TooltipContent>
                            </TooltipPortal>
                          </TooltipRoot>
                        </TooltipProvider>
                      </div>
                    </div>

                    <div class="mt-2 inline-flex h-[66px] w-full flex-col items-center justify-start gap-3 px-2">
                      <div class="inline-flex items-center justify-between self-stretch">
                        <span class="text-sm font-normal leading-tight text-neutral-200"> Mạng lưới hỗ trợ </span>
                        <div class="flex h-[22px] shrink grow basis-0 items-center justify-end gap-1">
                          <div class="text-sm font-semibold leading-snug text-primary">
                            {{ cryptoNetwork.token }} - {{ cryptoNetwork.network[0] }}
                          </div>
                        </div>
                      </div>
                      <div class="inline-flex items-center justify-between self-stretch">
                        <span class="text-sm font-normal leading-tight text-neutral-200"> Kiểm tra </span>
                        <div class="flex items-center justify-center gap-1 overflow-hidden">
                          <NuxtLink
                            id="detail-transaction-crypto-btn"
                            :to="`${getLinkScan(cryptoNetwork)}${cryptoNetwork.wallet_address}`"
                            target="_blank"
                            class="text-center text-sm font-semibold capitalize leading-tight text-primary-300 underline"
                          >
                            Xem giao dịch
                          </NuxtLink>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="inline-flex items-center justify-start gap-2 self-stretch px-2">
                  <div class="shrink grow basis-0 text-xs font-normal leading-none text-warning">
                    *Vui lòng kiểm tra kỹ thông tin trước khi chuyển tiền.
                  </div>
                </div>
              </div>
            </div>

            <div class="mb-5 mt-5 px-4">
              <p class="mb-3 text-base font-semibold leading-[22px] text-text-primary">
                3 Bước kiểm tra, nạp tiền nhanh chóng
              </p>
              <GuideList :guide-list="cryptoGuideList" />
              <div class="mt-6">
                <PlatForm />
              </div>
            </div>
          </div>
        </template>
      </PageLayoutMobile>
    </section>
  </ClientOnly>
</template>

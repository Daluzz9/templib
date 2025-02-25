<script lang="ts" setup>
import QrcodeVue from "qrcode.vue";
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

const tooltip = ref("Nhấn để Copy");
const { start, stop } = useTimeoutFn(() => {
  tooltip.value = "Nhấn để Copy";
}, 3000);

watch(tooltip, (newVal) => {
  if (newVal === "Đã Copy") {
    stop();
    start();
  }
});
</script>

<template>
  <ClientOnly>
    <section>
      <AccountOverviewLayout class="h-10 w-full grid-cols-account-layout-v2">
        <template #left>
          <div class="relative flex h-[666px] flex-col rounded-[8px] bg-background-bg-section_main px-6 pb-6 pt-3">
            <!-- Promotion block deposit -->
            <Teleport to="#block-deposit">
              <BlockDeposit
                v-if="systemPlan && hasJoinPromotion"
                :plan="systemPlan"
                :show-button="false"
                class="mb-5 h-[70px] w-full"
                @cancel-promotion="() => {}"
              >
                <template #rolling>
                  <p class="text-sm text-text-primary">
                    Tiền nạp sẽ được cộng vào doanh thu tiền cược hiện tại
                    <span class="font-semibold text-warning"
                      >{{
                        formatVNDCurrency(amountRolling / RATE_K_VND, {
                          currencySymbol: CurrencySymbolEnum.NONE,
                        })
                      }}K</span
                    >
                  </p>
                </template>
              </BlockDeposit>
            </Teleport>
            <div v-if="hasJoinPromotion" class="mb-5 h-[70px] w-full" />
            <div class="mb-[22px] h-[42px] w-full" />
            <div>
              <div class="mb-2 text-sm font-semibold leading-tight text-text-primary">Mạng lưới</div>
              <NetworkCrypto :currencies="currencies" is-deposit @change-network="changeCryptoNetwork">
                <template #nameNetwork="{ item }">
                  {{ `${item.token} - ${item.network[0]}` }}
                </template>
                <template #price="{ item }"> 1 {{ item.token }} = {{ formatVNDCurrency(item?.buy_price) }} </template>
              </NetworkCrypto>
            </div>

            <div class="flex flex-col rounded-[8px] bg-background-bg-section_main pb-5 pt-5">
              <p class="mb-2 text-sm font-semibold text-text-primary">3 Bước kiểm tra, nạp tiền nhanh chóng</p>
              <GuideList
                :guide-list="cryptoGuideList"
                is-guide-row
                class="rounded-lg bg-background-popup-header px-6 py-3"
              />
            </div>

            <AnimationGuide class="mt-0" />
          </div>
        </template>
        <template #right>
          <div class="flex flex-col rounded-[8px] bg-background-bg-section_main px-6 pb-6 pt-6">
            <p class="label-title">Quét mã hoặc chuyển tiền</p>
            <div class="w-full">
              <div ref="qrcode" class="flex flex-col items-center justify-center">
                <QrcodeVue
                  id="qr-crypto"
                  :value="cryptoNetwork.wallet_address"
                  level="H"
                  :size="168"
                  :margin="2"
                  class="mx-auto mb-2 mt-4 rounded-lg"
                />
                <div
                  class="mx-auto mb-2 inline-flex h-9 cursor-pointer items-center justify-center gap-1 overflow-hidden rounded-lg border border-border-tertiary bg-neutral-600 px-3 py-2 hover:bg-[#666666]"
                >
                  <div
                    id="download-crypto-btn"
                    class="text-center text-sm font-semibold leading-tight text-white"
                    @click="handleDownloadQRCode"
                  >
                    Tải mã QR
                  </div>
                </div>
              </div>

              <div
                class="mb-4 inline-flex h-[68px] w-full flex-col items-start justify-start gap-1 rounded-lg bg-background-bg-secondary p-2"
              >
                <span class="h-5 text-sm font-normal leading-tight text-neutral-200">Địa chỉ ví</span>
                <div class="inline-flex h-7 items-center justify-between gap-2 self-stretch">
                  <NuxtLink
                    class="wallet-link"
                    :to="`${getLinkScan(cryptoNetwork)}${cryptoNetwork.wallet_address}`"
                    target="_blank"
                  >
                    <p
                      v-if="cryptoNetwork.wallet_address && cryptoNetwork.wallet_address.length >= 8"
                      class="text-sm font-normal leading-tight text-primary"
                    >
                      <span class="text-sm font-normal leading-tight text-primary-300">
                        {{ formattedWalletAddress?.prefix }}
                      </span>
                      <span class="text-sm font-normal leading-tight">
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
                  <TooltipProvider :disable-closing-trigger="true" :delay-duration="0">
                    <Tooltip>
                      <TooltipTrigger>
                        <ButtonCopy
                          :copy-text="cryptoNetwork.wallet_address || ''"
                          is-button-copy
                          @copy="tooltip = 'Đã Copy'"
                        />
                      </TooltipTrigger>

                      <TooltipContent
                        class="z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-sm text-neutral-600 text-primary-foreground animate-in fade-in-0 zoom-in-95"
                        side="top"
                        :side-offset="5"
                        class-image="fill-[#F9F9F9]"
                      >
                        <span class="text-sm font-normal text-neutral-600">{{ tooltip }}</span>
                        <TooltipArrow :width="8" filled />
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>

              <div class="inline-flex h-[66px] w-full flex-col items-center justify-center gap-3 px-2">
                <div class="inline-flex items-center justify-between self-stretch">
                  <span class="text-sm font-normal leading-tight text-neutral-200"> Mạng lưới hỗ trợ </span>
                  <div class="flex h-[22px] shrink grow basis-0 items-center justify-end gap-1">
                    <div class="text-base font-semibold leading-snug text-primary">
                      {{ cryptoNetwork?.token }} - {{ cryptoNetwork.network[0] }}
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
                <div class="h-[0px] self-stretch border border-white/10"></div>
              </div>
            </div>
            <div class="mx-2 mb-5 mt-2 text-sm font-normal leading-tight text-warning">
              *Vui lòng kiểm tra kỹ thông tin trước khi chuyển tiền.
            </div>
            <PlatForm />
          </div>
        </template>
      </AccountOverviewLayout>
    </section>
  </ClientOnly>
</template>

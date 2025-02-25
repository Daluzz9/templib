<script setup lang="ts">
import { eWalletGuideList } from "~/components/pages/account/deposit/deposit-static";

const appStore = useAppStore();
const { hasJoinPromotion, systemPlan, amountRolling } = storeToRefs(appStore);

const { invoiceQRCode, hasRefreshInvoice, formattedInvoice, handleRandomInvoice } = useDepositEWallet();
</script>

<template>
  <section class="h-full">
    <AccountOverviewLayout class="h-full w-full grid-cols-account-layout-v2">
      <template #left>
        <div class="rounded-lg bg-background-menu-account p-6 pt-3">
          <!-- Promotion block deposit -->
          <Teleport v-if="systemPlan && hasJoinPromotion" to="#block-deposit">
            <BlockDeposit :plan="systemPlan" :show-button="false" class="mb-5 h-[70px] w-full">
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
          <!-- Sub menu each deposit method -->
          <div class="mb-5 h-[42px] w-full" />

          <div class="mb-5">
            <p class="mb-2 text-sm font-semibold">Loại ví</p>
            <EWalletPaymentMethod />
          </div>

          <div class="mb-5">
            <p class="mb-2 text-sm font-semibold text-text-primary">Hướng dẫn nạp tiền</p>
            <GuideList
              :guide-list="eWalletGuideList"
              is-guide-row
              class="rounded-lg bg-background-popup-header px-6 py-3"
            />
          </div>

          <AnimationGuide />
        </div>
      </template>
      <template #right>
        <div class="rounded-lg bg-background-menu-account p-6">
          <Invoice
            :info="formattedInvoice"
            :img-url="invoiceQRCode"
            :has-refresh-button="hasRefreshInvoice"
            title="Quét mã hoặc chuyển tiền"
            note="*Giao dịch sẽ bị hủy nếu nhập sai thông tin chuyển tiền."
            @refresh-invoice="handleRandomInvoice"
          />
        </div>
      </template>
    </AccountOverviewLayout>
  </section>
</template>

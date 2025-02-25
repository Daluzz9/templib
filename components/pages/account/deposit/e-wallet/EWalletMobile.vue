<script setup lang="ts">
import { eWalletGuideList } from "../deposit-static";

const appStore = useAppStore();
const { hasJoinPromotion, systemPlan, amountRolling } = storeToRefs(appStore);

const { invoiceQRCode, hasRefreshInvoice, formattedInvoice, handleRandomInvoice } = useDepositEWallet();
const { handlePageBack } = useBackNavigation();
const { openSidebarMenu } = useSidebarMenu();

const handleBack = () => {
  openSidebarMenu(SidebarMenuEnum.ACCOUNT_DEPOSIT);
  handlePageBack();
};
</script>

<template>
  <PageLayoutMobile class="min-h-dvh">
    <template #header>
      <PageHeaderMobile title="Nạp Qua Ví Điện Tử" @back="handleBack()" />
    </template>
    <template #main>
      <div class="p-4">
        <!-- Promotion block deposit -->
        <BlockDeposit v-if="systemPlan && hasJoinPromotion" :plan="systemPlan" :show-button="false" class="mb-5">
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

        <div class="mb-5">
          <p class="mb-2 text-sm font-semibold">Loại ví</p>
          <EWalletPaymentMethod class="gap-2" />
        </div>

        <div class="mb-5">
          <Invoice
            :info="formattedInvoice"
            :img-url="invoiceQRCode"
            :has-refresh-button="hasRefreshInvoice"
            title="Quét mã hoặc chuyển tiền"
            note="*Giao dịch sẽ bị hủy nếu nhập sai thông tin chuyển tiền."
            @refresh-invoice="handleRandomInvoice"
          >
            <template #action> <span /></template>
          </Invoice>
        </div>

        <div>
          <p class="mb-3 text-base font-semibold leading-[22px] text-text-primary">Hướng dẫn nạp tiền</p>
          <GuideList :guide-list="eWalletGuideList" />
        </div>
      </div>
    </template>
  </PageLayoutMobile>
</template>

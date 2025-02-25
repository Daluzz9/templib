<script setup lang="ts">
import { withdrawCardGuideList } from "../withdraw-static";

const appStore = useAppStore();
const { hasJoinPromotion, systemPlan, amountRolling } = storeToRefs(appStore);

const {
  phoneCardPriceByProviderList,
  cardNetworksWithdraw,
  handleSelectAmount,
  handleSelectCardNetwork,
  formWithdrawCard,
  receivedAmount,
  isOverUserBalance,
  cardQuantityDefault,
  isWithdrawCardDisabled,
  submitFormWithdrawCard,
  getPhoneCardPaymentStatus,
} = useWithdrawCard();

const dialogBlockDeposit = useDialog();

const { handlePageBack } = useBackNavigation();
const { openSidebarMenu } = useSidebarMenu();

const handleBack = () => {
  openSidebarMenu(SidebarMenuEnum.ACCOUNT_WITHDRAW);
  handlePageBack();
};
</script>

<template>
  <DialogBlockDeposit v-if="dialogBlockDeposit.isOpen.value" :controller="dialogBlockDeposit" />
  <BlockDepositMobile
    v-if="systemPlan && hasJoinPromotion"
    :plan="systemPlan"
    show-button
    @cancel-promotion="dialogBlockDeposit?.openDialog()"
  >
    <template #rolling>
      <p class="text-sm font-normal text-text-primary">
        Vui lòng hoàn thành số tiền cược yêu cầu
        <span class="text-warning"
          >{{
            formatVNDCurrency(amountRolling / RATE_K_VND, {
              currencySymbol: CurrencySymbolEnum.NONE,
            })
          }}K</span
        >
        trước khi rút tiền qua <span class="capitalize">Thẻ cào</span>.
      </p>
    </template>
  </BlockDepositMobile>

  <Form v-slot="{ isSubmitting }" :initial-values="formWithdrawCard" @submit="submitFormWithdrawCard">
    <PageLayoutMobile class="min-h-dvh">
      <template #header>
        <PageHeaderMobile title="Rút Qua Thẻ Cào" @back="handleBack()" />
      </template>
      <template #main>
        <UserBalance class="mb-1" />
        <div class="p-4">
          <div class="mb-5">
            <p class="mb-2 text-sm font-semibold text-text-primary">Nhà cung cấp</p>
            <div class="grid grid-cols-3 items-center gap-2">
              <FormField
                v-for="network in cardNetworksWithdraw || []"
                :key="network.systemPhoneCardProviderName"
                name="to_telcom_code"
              >
                <MaintenanceStatusIndicatorBtn
                  :img="network.img"
                  :status="getPhoneCardPaymentStatus(network)"
                  :is-under-maintenance="
                    network.systemPhoneCardPaymentInfo.status !== SystemCardPaymentResponseStatus.USEABLE
                  "
                  class="h-10 w-full"
                  @click="handleSelectCardNetwork(network)"
                />
              </FormField>
            </div>
          </div>

          <div class="mb-5">
            <p class="mb-2 text-sm font-semibold text-text-primary">Chọn mệnh giá thẻ (VND)</p>
            <div class="grid grid-cols-3 gap-[6px]">
              <FormField v-for="amount in phoneCardPriceByProviderList || []" :key="amount" name="card_amount_unit">
                <PriceSelector
                  :amount="amount"
                  :status="
                    formWithdrawCard.card_amount_unit === amount
                      ? PriceSelectorStatusEnum.ACTIVE
                      : PriceSelectorStatusEnum.DEFAULT
                  "
                  class="h-9"
                  @click="handleSelectAmount(amount)"
                />
              </FormField>
            </div>
          </div>

          <div class="mb-5">
            <div class="mb-5 flex items-center justify-between gap-1">
              <p class="text-sm font-semibold text-text-primary">Số lượng</p>
              <FormField name="card_number">
                <CardQuantity
                  class="flex w-[120px] items-center justify-between"
                  :min-quantity="CARD_WITHDRAWAL_RANGE.MIN"
                  :max-quantity="CARD_WITHDRAWAL_RANGE.MAX"
                  :default-quantity="cardQuantityDefault"
                  @update-quantity="(quantity) => (formWithdrawCard.card_number = quantity)"
                />
              </FormField>
            </div>
            <div class="flex justify-between gap-1">
              <p class="text-sm font-semibold text-text-primary">Số tiền thực nhận</p>
              <p class="flex min-w-36 flex-col gap-2 text-right text-base font-semibold leading-[22px] text-text-money">
                <span>{{ formatVNDCurrency(receivedAmount) }}</span>
                <span v-if="isOverUserBalance" class="w-max text-xs text-text-error-primary">
                  Vượt quá số tiền có thể rút
                </span>
              </p>
            </div>
          </div>

          <hr class="mb-5 border-t border-border-primary" />

          <div>
            <p class="mb-3 text-base font-semibold leading-[22px] text-text-primary">Hướng dẫn rút tiền</p>
            <GuideList :guide-list="withdrawCardGuideList" />
          </div>
        </div>
      </template>
      <template #bottom>
        <div class="bg-background-bg-section_main p-4">
          <Button
            type="submit"
            :disabled="isWithdrawCardDisabled || isSubmitting"
            :is-loading="isSubmitting"
            class="h-12 w-full text-base font-bold"
          >
            Đổi Thẻ Cào
          </Button>
        </div>
      </template>
    </PageLayoutMobile>
  </Form>
</template>

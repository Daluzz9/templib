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
</script>

<template>
  <section class="h-full">
    <DialogBlockDeposit v-if="dialogBlockDeposit.isOpen.value" :controller="dialogBlockDeposit" />
    <AccountOverviewLayout class="h-full w-full grid-cols-account-layout-v2">
      <template #left>
        <div class="rounded-lg bg-background-menu-account p-6 pt-3">
          <!-- Promotion block deposit -->
          <Teleport v-if="systemPlan && hasJoinPromotion" to="#block-withdraw">
            <BlockDeposit
              :plan="systemPlan"
              class="mb-5 w-full"
              show-button
              @cancel-promotion="dialogBlockDeposit.openDialog()"
            >
              <template #rolling>
                <p class="text-sm text-text-primary">
                  Vui lòng hoàn thành số tiền cược yêu cầu
                  <span class="text-warning"
                    >{{
                      formatVNDCurrency(amountRolling / RATE_K_VND, {
                        currencySymbol: CurrencySymbolEnum.NONE,
                      })
                    }}K</span
                  >
                  trước khi rút tiền qua Thẻ cào.
                </p>
              </template>
            </BlockDeposit>
          </Teleport>
          <div v-if="hasJoinPromotion" class="mb-5 h-[90px] w-full" />
          <!-- Sub menu each deposit method -->
          <div class="mb-5 h-[42px] w-full" />
          <Form v-slot="{ isSubmitting }" :initial-values="formWithdrawCard" @submit="submitFormWithdrawCard">
            <div class="mb-5">
              <p class="mb-2 text-sm font-semibold text-text-primary">Nhà cung cấp</p>
              <div class="grid grid-cols-3 items-center gap-4">
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
                    class="group h-10 w-full hover:border-tab-payment-borderActive hover:bg-tab-payment-bgActive"
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
                    class="group h-10 hover:border-tab-payment-borderActive hover:bg-tab-money-bgActive"
                    @click="handleSelectAmount(amount)"
                  />
                </FormField>
              </div>
            </div>
            <div class="mb-5 flex items-center justify-between">
              <div class="flex items-center gap-6">
                <p class="text-sm font-semibold text-text-primary">Số lượng</p>
                <FormField name="card_number">
                  <CardQuantity
                    class="flex w-[138px] items-center justify-between"
                    :min-quantity="CARD_WITHDRAWAL_RANGE.MIN"
                    :max-quantity="CARD_WITHDRAWAL_RANGE.MAX"
                    :default-quantity="cardQuantityDefault"
                    @update-quantity="(quantity) => (formWithdrawCard.card_number = quantity)"
                  />
                </FormField>
              </div>
              <div class="flex items-center gap-1">
                <p class="text-sm font-semibold text-text-primary">Số tiền thực nhận</p>
                <p class="relative min-w-36 text-right text-base font-semibold text-text-money">
                  {{ formatVNDCurrency(receivedAmount) }}
                  <span v-if="isOverUserBalance" class="absolute right-0 top-6 w-max text-xs text-text-error-primary">
                    Vượt quá số tiền có thể rút
                  </span>
                </p>
              </div>
            </div>
            <div class="flex justify-center">
              <Button
                type="submit"
                :disabled="isWithdrawCardDisabled || isSubmitting"
                :is-loading="isSubmitting"
                class="h-12 w-[250px] text-base font-bold"
              >
                Đổi Thẻ Cào
              </Button>
            </div>
          </Form>
        </div>
      </template>
      <template #right>
        <div class="rounded-lg bg-background-menu-account p-6">
          <div class="mb-5">
            <p class="mb-3 text-base font-semibold leading-[22px] text-text-primary">Hướng dẫn rút tiền</p>
            <GuideList :guide-list="withdrawCardGuideList" />
          </div>
        </div>
      </template>
    </AccountOverviewLayout>
  </section>
</template>

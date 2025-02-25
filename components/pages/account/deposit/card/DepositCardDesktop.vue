<script setup lang="ts">
import { depositCardGuideList } from "~/components/pages/account/deposit/deposit-static";

const appStore = useAppStore();
const { hasJoinPromotion, systemPlan, amountRolling } = storeToRefs(appStore);

const {
  DepositPhoneCardFormFIeldsEnum,
  systemPhoneCardPaymentFee,
  phoneCardPriceByProviderList,
  currentPhoneCardPaymentWImg,
  mappedSystemPhoneCardPaymentWImg,
  handleSelectCardNetwork,
  isDepositCardDisabled,
  handleActionCardCode,
  handleActionCardSerial,
  submitFormDepositCard,
  getPhoneCardPaymentStatus,
  cardAmount,
  cardCode,
  cardSerial,
  isSubmitting,
  errors,
} = useDepositPhoneCard();
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

          <form @submit="submitFormDepositCard">
            <div class="mb-5">
              <p class="mb-2 text-sm font-semibold text-text-primary">Nhà cung cấp</p>
              <div class="grid grid-cols-4 items-center gap-4">
                <FormField
                  v-for="mappedSystemPhoneCardPayment in mappedSystemPhoneCardPaymentWImg || []"
                  :key="mappedSystemPhoneCardPayment.systemPhoneCardProviderName"
                  :name="DepositPhoneCardFormFIeldsEnum.TO_TELCOM_CODE"
                >
                  <MaintenanceStatusIndicatorBtn
                    :img="mappedSystemPhoneCardPayment.img"
                    :status="getPhoneCardPaymentStatus(mappedSystemPhoneCardPayment)"
                    :is-under-maintenance="
                      mappedSystemPhoneCardPayment.systemPhoneCardPaymentInfo.status !==
                      SystemCardPaymentResponseStatus.USEABLE
                    "
                    class="group h-10 w-full hover:border-tab-payment-borderActive hover:bg-tab-payment-bgActive"
                    @click="handleSelectCardNetwork(mappedSystemPhoneCardPayment)"
                  />
                </FormField>
              </div>
            </div>

            <div class="mb-5">
              <div class="mb-2 flex items-center justify-between">
                <p class="text-sm font-semibold text-text-primary">Chọn mệnh giá thẻ (VND)</p>
                <p class="text-sm text-text-secondary">
                  Phí gạch thẻ <span class="font-semibold text-primary-300">{{ systemPhoneCardPaymentFee }} %</span>
                </p>
              </div>
              <div class="grid grid-cols-3 gap-[6px]">
                <FormField
                  v-for="amount in phoneCardPriceByProviderList || []"
                  :key="amount"
                  :name="DepositPhoneCardFormFIeldsEnum.CARD_AMOUNT"
                >
                  <PriceSelector
                    :amount="amount"
                    :status="cardAmount === amount ? PriceSelectorStatusEnum.ACTIVE : PriceSelectorStatusEnum.DEFAULT"
                    class="group h-10 hover:border-tab-payment-borderActive hover:bg-tab-money-bgActive"
                    @click="cardAmount = amount"
                  />
                </FormField>
              </div>
            </div>

            <div v-show="cardAmount" class="mb-5 grid grid-cols-2 gap-4">
              <FormField v-slot="{ componentField }" :name="DepositPhoneCardFormFIeldsEnum.CARD_SERIAL">
                <FormItem>
                  <FormLabel class="font-semibold">Số seri thẻ</FormLabel>
                  <FormControl>
                    <InputText
                      v-model="cardSerial"
                      :name="componentField.name"
                      :type="
                        currentPhoneCardPaymentWImg.systemPhoneCardProviderName === SystemPhoneCardPaymentNameEnum.ZING
                          ? 'text'
                          : 'number'
                      "
                      :max-length="CARD_SERIAL_LENGTH.MAX"
                      placeholder=""
                      class="h-12"
                    >
                      <template #suffix>
                        <button
                          type="button"
                          class="cursor-pointer text-sm text-primary-300"
                          @click.stop="handleActionCardSerial"
                        >
                          {{ cardSerial ? "Xoá" : "Dán mã" }}
                        </button>
                      </template>
                    </InputText>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
              <FormField v-slot="{ componentField }" :name="DepositPhoneCardFormFIeldsEnum.CARD_CODE">
                <FormItem>
                  <FormLabel class="font-semibold">Mã thẻ (Mã PIN)</FormLabel>
                  <FormControl>
                    <InputText
                      v-model="cardCode"
                      :name="componentField.name"
                      :type="
                        currentPhoneCardPaymentWImg.systemPhoneCardProviderName === SystemPhoneCardPaymentNameEnum.ZING
                          ? 'text'
                          : 'number'
                      "
                      :max-length="CARD_CODE_LENGTH.MAX"
                      placeholder=""
                      class="h-12"
                    >
                      <template #suffix>
                        <button
                          type="button"
                          class="cursor-pointer text-sm text-primary-300"
                          @click.stop="handleActionCardCode"
                        >
                          {{ cardCode ? "Xoá" : "Dán mã" }}
                        </button>
                      </template>
                    </InputText>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
            </div>

            <div v-show="cardAmount" class="mb-5">
              <RechargeCardInfo :card-value="cardAmount" :fee-number="systemPhoneCardPaymentFee" />
            </div>

            <div class="flex justify-center">
              <Button
                :disabled="Object.keys(errors).length || isDepositCardDisabled || isSubmitting"
                :is-loading="isSubmitting"
                type="submit"
                class="h-12 w-[250px] rounded-lg text-base font-bold"
              >
                Nạp Tiền
              </Button>
            </div>
          </form>
        </div>
      </template>
      <template #right>
        <div class="rounded-lg bg-background-menu-account p-6">
          <div class="mb-5">
            <p class="mb-3 text-base font-semibold leading-[22px] text-text-primary">Hướng dẫn nạp tiền</p>
            <GuideList :guide-list="depositCardGuideList" />
          </div>
        </div>
      </template>
    </AccountOverviewLayout>
  </section>
</template>

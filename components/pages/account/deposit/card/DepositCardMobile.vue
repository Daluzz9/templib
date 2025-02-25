<script setup lang="ts">
import { depositCardGuideList } from "~/components/pages/account/deposit/deposit-static";

const appStore = useAppStore();
const { hasJoinPromotion, systemPlan, amountRolling } = storeToRefs(appStore);
const { handlePageBack } = useBackNavigation();
const { openSidebarMenu } = useSidebarMenu();

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

const handleBack = () => {
  openSidebarMenu(SidebarMenuEnum.ACCOUNT_DEPOSIT);
  handlePageBack();
};
</script>

<template>
  <form @submit="submitFormDepositCard">
    <PageLayoutMobile class="min-h-dvh">
      <template #header>
        <PageHeaderMobile title="Nạp Qua Thẻ Cào" @back="handleBack()" />
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
            <p class="mb-2 text-sm font-semibold text-text-primary">Nhà cung cấp</p>
            <div class="grid grid-cols-2 items-center gap-2">
              <FormField
                v-for="network in mappedSystemPhoneCardPaymentWImg || []"
                :key="network.systemPhoneCardProviderName"
                :name="DepositPhoneCardFormFIeldsEnum.TO_TELCOM_CODE"
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
                  class="h-9"
                  @click="cardAmount = amount"
                />
              </FormField>
            </div>
          </div>

          <div v-show="cardAmount" class="mb-5 grid grid-cols-1 gap-4">
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
                      <button type="button" class="text-sm text-primary-300" @click="handleActionCardSerial">
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
                      <button type="button" class="text-sm text-primary-300" @click="handleActionCardCode">
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

          <div>
            <p class="mb-3 text-base font-semibold leading-[22px] text-text-primary">Hướng dẫn nạp tiền</p>
            <GuideList :guide-list="depositCardGuideList" />
          </div>
        </div>
      </template>
      <template #bottom>
        <div class="bg-background-bg-section_main p-4">
          <Button
            type="submit"
            :disabled="Object.keys(errors).length || isDepositCardDisabled || isSubmitting"
            :is-loading="isSubmitting"
            class="h-12 w-full text-base font-bold"
          >
            Nạp Tiền
          </Button>
        </div>
      </template>
    </PageLayoutMobile>
  </form>
</template>

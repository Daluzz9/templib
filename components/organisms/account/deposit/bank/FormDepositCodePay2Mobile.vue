<script setup lang="ts">
import { bankGuideList } from "~/components/pages/account/deposit/deposit-static";

const {
  depositCodepayValidationSchema,
  formDepositValues,
  isCommissionPackage,
  convertUnitToVND,
  submitFormDeposit,
  viewDetailDeposit,
  detailDeposit,
  currentDepositStep,
  AMOUNT_FIELD_RULE,
  createNewDepositInvoice,
  isLoading,
  systemPlan,
  hasJoinPromotion,
  amountRolling,
} = useAccountDepositCodepay2();
const { handlePageBack } = useBackNavigation();
const { openSidebarMenu } = useSidebarMenu();

const handleBack = () => {
  openSidebarMenu(SidebarMenuEnum.ACCOUNT_DEPOSIT);
  handlePageBack();
};

const onSubmit = (_values: unknown) => {
  submitFormDeposit();
};
</script>
<template>
  <Form
    v-slot="{ errors, isSubmitting }"
    :validation-schema="depositCodepayValidationSchema"
    :initial-values="formDepositValues"
    class="min-h-dvh"
    @submit="onSubmit"
  >
    <PageLayoutMobile class="min-h-dvh">
      <template #header>
        <PageHeaderMobile title="Nạp Qua CodePay2" @back="handleBack()" />
      </template>
      <template #main>
        <div class="p-4">
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
          <!-- If currentDepositStep is 1, render the Form input deposit -->
          <div v-show="currentDepositStep === 1">
            <FormField v-slot="{ componentField }" name="amount">
              <FormItem>
                <FormLabel class="font-semibold">Số tiền nạp (K)</FormLabel>
                <FormControl>
                  <InputMaskNumber
                    v-model.number="formDepositValues.amount"
                    class="h-12"
                    placeholder="Từ 50 - 300,000"
                    :name="componentField.name"
                    :max-length="AMOUNT_FIELD_RULE.MAX"
                  >
                    <template #suffix>
                      <span
                        :class="
                          cn(
                            'text-sm font-normal',
                            formDepositValues.amount > 0 ? 'text-secondary' : 'text-text-secondary',
                          )
                        "
                        >{{ convertUnitToVND }}</span
                      >
                    </template>
                  </InputMaskNumber>
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <SuggestedPriceGroup
              class="mt-3"
              :amount="formDepositValues.amount"
              :suggest-prices="SUGGESTED_AMOUNTS"
              @selected="formDepositValues.amount = $event"
            />
            <p v-if="isCommissionPackage" class="mt-5 text-sm font-semibold text-warning">
              *Bạn được áp dụng Hoàn trả vô tận
            </p>
          </div>

          <!-- View Detail Deposit -->
          <div v-if="currentDepositStep !== 1">
            <Invoice
              :key="detailDeposit.qrcode_url"
              :info="viewDetailDeposit"
              :img-url="detailDeposit.qrcode_url"
              title="Quét mã hoặc chuyển tiền"
              note="*Giao dịch sẽ bị hủy nếu nhập sai thông tin chuyển tiền."
              :invoice-id="detailDeposit.invoice_id"
              qr-code-note="Mã QR chỉ sử dụng 01 lần"
            >
              <template #timer>
                <CountDown
                  v-slot="{ remaining }"
                  :end-date="detailDeposit.timeLeft"
                  @countdown-end="createNewDepositInvoice()"
                >
                  <p v-if="remaining.seconds > 0 || remaining.minutes > 0" class="text-sm font-normal text-secondary">
                    <span class="font-semibold">{{ formatTwoDigitsTime(remaining.minutes) }}:</span>
                    <span class="font-semibold">{{ formatTwoDigitsTime(remaining.seconds) }}</span>
                  </p>
                </CountDown>
              </template>
              <template #action> <span /> </template>
            </Invoice>
            <div class="mt-5">
              <p class="mb-3 text-base font-semibold leading-[22px] text-text-primary">Hướng dẫn nạp tiền</p>
              <GuideList :guide-list="bankGuideList" />
            </div>
          </div>
        </div>
      </template>
      <template #bottom>
        <div v-if="currentDepositStep === 1" class="flex w-full justify-center bg-background-menu-account p-4">
          <Button
            :disabled="Object.keys(errors).length || !formDepositValues.amount"
            type="submit"
            size="xl"
            class="h-12 w-full rounded-lg"
            :is-loading="isSubmitting"
          >
            Lấy Mã Nạp Tiền
          </Button>
        </div>
        <div v-else class="bg-background-menu-account p-4">
          <CountDown v-slot="{ remaining }" :end-date="detailDeposit.timeLeftCreateNewInvoice">
            <Button
              class="font-base h-12 w-full font-bold"
              :disabled="remaining.seconds > 0 || isLoading"
              @click="createNewDepositInvoice()"
            >
              Lấy Mã Khác
              <span v-if="remaining.seconds > 0" class="text-secondary-400">
                {{ formatTwoDigitsTime(remaining.seconds) }}
              </span>
              <span v-if="remaining.seconds > 0">S</span>
            </Button>
          </CountDown>
        </div>
      </template>
    </PageLayoutMobile>
  </Form>
</template>

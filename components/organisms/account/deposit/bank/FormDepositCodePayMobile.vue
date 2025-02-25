<script setup lang="ts">
import { AccountPromotionCard } from "#components";
import { bankGuideList } from "~/components/pages/account/deposit/deposit-static";

const appStore = useAppStore();

const { hasJoinPromotion, systemPlan } = storeToRefs(appStore);

const {
  depositCodepayValidationSchema,
  formDepositValues,
  promotionPackages,
  isCommissionPackage,
  convertUnitToVND,
  submitFormDeposit,
  viewDetailDeposit,
  detailDeposit,
  currentDepositStep,
  AMOUNT_FIELD_RULE,
  navigateToDetailTransaction,
  createNewDepositInvoice,
} = useAccountDepositCodepay();

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
        <PageHeaderMobile title="Nạp Qua CodePay" @back="handleBack()" />
      </template>
      <template #main>
        <div class="p-4">
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
            <div v-else-if="!systemPlan || !hasJoinPromotion" class="mt-5">
              <label class="mb-2 block text-sm font-semibold leading-none">Khuyến mãi</label>
              <div :class="cn('grid gap-2', 'grid-flow-row grid-cols-2')">
                <FormField
                  v-for="promotion in promotionPackages"
                  :key="promotion.id"
                  v-slot="{ componentField }"
                  name="package_id"
                  type="radio"
                >
                  <AccountPromotionCard
                    v-model="formDepositValues.package_id"
                    :title="promotion.percent || ''"
                    :description="promotion.description || ''"
                    :name="componentField.name"
                    :value="promotion.id"
                  />
                </FormField>
              </div>
              <ErrorMessage
                as="p"
                name="package_id"
                class="mt-2 text-sm font-medium text-destructive text-text-error-primary"
              />
            </div>
            <h3 v-if="formDepositValues.package_id > 1" class="mt-5 text-sm font-semibold text-text-primary">
              Xác thực số tiền
            </h3>
            <DepositCodePayInfo
              v-if="formDepositValues.package_id > 1"
              class="mt-2"
              :package-id="formDepositValues.package_id"
              :amount-deposit="formDepositValues.amount"
            />
          </div>

          <!-- View Detail Deposit -->
          <div v-if="currentDepositStep !== 1">
            <Invoice
              :key="detailDeposit.invoice_id"
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
            class="h-12 w-full rounded-lg font-bold"
            size="xl"
            :is-loading="isSubmitting"
          >
            Lấy Mã Nạp Tiền
          </Button>
        </div>
        <div
          v-else
          class="grid w-full grid-flow-col grid-cols-2 items-center justify-center gap-3 bg-background-menu-account p-4"
        >
          <CountDown v-slot="{ remaining }" :end-date="detailDeposit.timeLeftCreateNewInvoice">
            <Button
              variant="secondary"
              class="font-base h-12 w-full font-bold"
              :class="{ 'border-[1.5px] border-border-primary': remaining.seconds > 0 }"
              :disabled="remaining.seconds > 0"
              @click="createNewDepositInvoice()"
            >
              Lấy Mã Khác
              <span v-if="remaining.seconds > 0" class="text-secondary-400">
                {{ formatTwoDigitsTime(remaining.seconds) }}
              </span>
              <span v-if="remaining.seconds > 0">S</span>
            </Button>
          </CountDown>
          <Button class="font-base h-12 w-full font-bold" @click="navigateToDetailTransaction">Đã Chuyển Tiền</Button>
        </div>
      </template>
    </PageLayoutMobile>
  </Form>
</template>

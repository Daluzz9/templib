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

const onSubmit = (_values: unknown) => {
  submitFormDeposit();
};
</script>
<template>
  <!-- If currentDepositStep is 1, render the Form input deposit -->
  <template v-if="currentDepositStep === 1">
    <Form
      v-slot="{ errors, isSubmitting }"
      :validation-schema="depositCodepayValidationSchema"
      :initial-values="formDepositValues"
      :class="{ 'opacity-1 pointer-events-none': systemPlan && hasJoinPromotion }"
      @submit="onSubmit"
    >
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
                    cn('text-sm font-normal', formDepositValues.amount > 0 ? 'text-secondary' : 'text-text-secondary')
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
      <div v-else-if="!systemPlan || !hasJoinPromotion" class="mt-6">
        <label class="mb-2 block text-sm font-semibold leading-none">Khuyến mãi</label>
        <div class="grid grid-cols-4 gap-2">
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
      <DepositCodePayInfo
        v-if="formDepositValues.package_id > 1"
        class="mt-5"
        :package-id="formDepositValues.package_id"
        :amount-deposit="formDepositValues.amount"
      />
      <div class="mt-5 flex w-full justify-center">
        <Button
          :disabled="Object.keys(errors).length || !formDepositValues.amount"
          type="submit"
          size="xl"
          class="h-12 w-64 rounded-lg"
          :is-loading="isSubmitting"
        >
          Lấy Mã Nạp Tiền
        </Button>
      </div>
    </Form>
  </template>
  <!-- Else show info deposit -->
  <template v-else>
    <label class="mb-2 mt-7 block text-sm font-semibold leading-none">Số tiền nạp (K)</label>
    <InputMaskNumber
      v-model="formDepositValues.amount"
      name="package_id"
      class="h-12"
      placeholder="Từ 50 - 300,000"
      disabled
    >
      <template #suffix>
        <span
          :class="cn('text-sm font-semibold', formDepositValues.amount > 0 ? 'text-secondary' : 'text-text-secondary')"
          >{{ convertUnitToVND }}</span
        >
      </template>
    </InputMaskNumber>
    <AnimationGuide />
  </template>

  <!-- Teleport to bank.vue component -->
  <!-- View Detail Deposit -->
  <Teleport to="#deposit-codepay-detail" defer>
    <div v-if="currentDepositStep === 1" class="mb-5">
      <p class="mb-3 text-base font-semibold leading-[22px] text-text-primary">Hướng dẫn nạp tiền</p>
      <GuideList :guide-list="bankGuideList" />
      <PaymentGatewayList class="mt-6" />
    </div>
    <Invoice
      v-else
      :key="detailDeposit.invoice_id"
      :info="viewDetailDeposit"
      :img-url="detailDeposit.qrcode_url"
      title="Quét mã hoặc chuyển tiền"
      note="*Giao dịch sẽ bị hủy nếu nhập sai thông tin chuyển tiền."
      :invoice-id="detailDeposit.invoice_id"
      qr-code-note="Mã QR chỉ sử dụng 01 lần"
    >
      <template #timer>
        <CountDown v-slot="{ remaining }" :end-date="detailDeposit.timeLeft" @countdown-end="createNewDepositInvoice()">
          <p
            v-if="remaining.seconds > 0 || remaining.minutes > 0"
            class="text-base font-semibold leading-[22px] text-secondary"
          >
            <span class="font-semibold">{{ formatTwoDigitsTime(remaining.minutes) }}:</span>
            <span class="font-semibold">{{ formatTwoDigitsTime(remaining.seconds) }}</span>
          </p>
        </CountDown>
      </template>
      <template #action>
        <div class="mt-5 grid w-full grid-cols-2 items-center justify-center gap-3">
          <CountDown v-slot="{ remaining }" :end-date="detailDeposit.timeLeftCreateNewInvoice">
            <Button
              variant="secondary"
              class="h-12 w-full text-base font-bold"
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
          <Button class="h-12 w-full text-base font-bold" @click="navigateToDetailTransaction">Đã Chuyển Tiền</Button>
        </div>
      </template>
    </Invoice>
  </Teleport>
</template>

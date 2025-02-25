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
} = useAccountDepositCodepay2();

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
      <div class="mt-5 flex w-full justify-center">
        <Button
          :disabled="Object.keys(errors).length || !formDepositValues.amount"
          type="submit"
          class="h-12 w-64 rounded-lg"
          :is-loading="isSubmitting"
          size="xl"
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
      :key="detailDeposit.qrcode_url"
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
        <div class="mt-5 flex w-full items-center justify-center">
          <CountDown v-slot="{ remaining }" :end-date="detailDeposit.timeLeftCreateNewInvoice">
            <Button
              class="h-12 w-64 text-base font-bold"
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
        </div>
      </template>
    </Invoice>
  </Teleport>
</template>

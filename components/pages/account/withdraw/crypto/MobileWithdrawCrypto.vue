<script lang="ts" setup>
const {
  formData,
  handlePaste,
  handleClear,
  currencies,
  changeCryptoNetwork,
  amountWithdraw,
  approximateAmount,
  submitFormWithdraw,
  withdrawCryptoValidationSchema,
  cryptoNetwork,
} = useWithdrawCrypto();

const { handlePageBack } = useBackNavigation();
const { openSidebarMenu } = useSidebarMenu();
const appStore = useAppStore();

const { hasJoinPromotion, systemPlan, amountRolling } = storeToRefs(appStore);

const handleBack = () => {
  openSidebarMenu(SidebarMenuEnum.ACCOUNT_WITHDRAW);
  handlePageBack();
};
const dialogBlockDeposit = useDialog();
</script>

<template>
  <section>
    <DialogBlockDeposit v-if="dialogBlockDeposit.isOpen.value" :controller="dialogBlockDeposit" />
    <BlockDepositMobile
      v-if="systemPlan && hasJoinPromotion"
      :plan="systemPlan"
      show-button
      @cancel-promotion="dialogBlockDeposit?.openDialog()"
    >
      <template #rolling>
        <p>
          Vui lòng hoàn thành số tiền cược yêu cầu
          <span class="text-warning"
            >{{
              formatVNDCurrency(amountRolling / RATE_K_VND, {
                currencySymbol: CurrencySymbolEnum.NONE,
              })
            }}K</span
          >
          trước khi rút tiền qua Tiền Ảo.
        </p>
      </template>
    </BlockDepositMobile>
    <Form
      id="withdrawCryptoForm"
      v-slot="{ errors, isSubmitting }"
      :validation-schema="withdrawCryptoValidationSchema"
      :initial-values="formData"
      class="flex flex-col"
      @submit="submitFormWithdraw"
    >
      <PageLayoutMobile class="min-h-dvh">
        <template #header>
          <PageHeaderMobile title="Rút qua Tiền Ảo" @back="handleBack()" />
        </template>

        <template #main>
          <UserBalance />
          <div class="flex flex-col">
            <div class="px-4 pt-5">
              <NetworkCrypto :currencies="currencies" @change-network="changeCryptoNetwork">
                <template #nameNetwork="{ item }">
                  <p>{{ `${item.token}` }}</p>
                  <p>{{ `${item.network[0]}` }}</p>
                </template>
              </NetworkCrypto>
              <div class="mt-2 inline-flex h-5 w-[343px] items-center justify-start gap-1">
                <div class="text-justify text-sm font-normal leading-tight text-neutral-200">Tỷ giá</div>
                <div class="flex items-center justify-end gap-0.5">
                  <div class="text-justify text-sm font-semibold leading-tight tracking-[1px] text-secondary">
                    1 {{ cryptoNetwork?.token }} = {{ formatVNDCurrency(cryptoNetwork?.buy_price) }}
                  </div>
                </div>
              </div>
            </div>

            <div class="my-4 flex flex-col gap-4 px-4">
              <div class="flex flex-col">
                <FormField v-slot="{ componentField }" name="amount">
                  <FormItem class="mb-[11px]">
                    <FormLabel class="mb-2 text-sm font-semibold leading-tight text-text-primary"
                      >Số tiền rút (K)</FormLabel
                    >
                    <FormControl>
                      <InputMaskNumber
                        v-model.number="amountWithdraw"
                        class="h-12"
                        placeholder=""
                        :max-length="8"
                        :name="componentField.name"
                      >
                        <template #suffix>
                          <span class="text-sm font-normal leading-tight text-text-secondary">
                            <span :class="cn(amountWithdraw > 0 ? 'text-secondary' : 'text-text-secondary')">
                              {{ approximateAmount }}
                            </span>
                          </span>
                        </template>
                      </InputMaskNumber>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>

                <FormField v-slot="{ componentField, setValue }" name="wallet_address">
                  <FormItem>
                    <FormLabel class="mb-2 text-sm font-semibold leading-tight text-text-primary"
                      >Địa chỉ ví của bạn</FormLabel
                    >
                    <FormControl>
                      <InputTextArea
                        v-model="formData.wallet_address"
                        type="text"
                        :maxlength="50"
                        placeholder=""
                        class="h-12"
                        class-input="pr-0 no-scrollbar leading-7"
                        :name="componentField.name"
                      >
                        <template #suffix>
                          <div
                            v-if="!formData.wallet_address"
                            class="cursor-pointer text-sm font-normal leading-tight text-primary-300"
                            @click="handlePaste(setValue)"
                          >
                            Dán mã
                          </div>
                          <div
                            v-else
                            class="cursor-pointer text-sm font-normal leading-tight text-primary-300"
                            @click="handleClear(setValue)"
                          >
                            Xóa
                          </div>
                        </template>
                      </InputTextArea>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>
              </div>
            </div>

            <div class="mb-5 px-4">
              <p class="mb-3 text-base font-semibold leading-[22px] text-text-primary">
                3 Bước kiểm tra, rút tiền nhanh chóng
              </p>
              <GuideList :guide-list="cryptoGuideList" />
              <div class="mt-6">
                <PlatForm />
              </div>
            </div>
          </div>
        </template>

        <template #bottom>
          <div class="flex w-full items-center justify-center gap-3 bg-background-menu-account px-4 py-4">
            <Button
              :disabled="Object.keys(errors).length || amountWithdraw <= 0 || !formData.wallet_address"
              type="submit"
              form="withdrawCryptoForm"
              :class="
                cn(
                  'bg-comps-tab-payment-bg-disabled font-base mx-auto inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg px-4 py-2 text-center text-base font-bold capitalize leading-snug',
                  Object.keys(errors).length || amountWithdraw <= 0 || !formData.wallet_address
                    ? 'bg-comps-tab-payment-bg-disabled text-neutral-400 disabled:border-neutral-600 sm:w-[250px]'
                    : 'bg-primary-400 text-white hover:border-primary-500 hover:bg-primary-500',
                )
              "
              :is-loading="isSubmitting"
              >Rút tiền</Button
            >
          </div>
        </template>
      </PageLayoutMobile>
    </Form>
  </section>
</template>

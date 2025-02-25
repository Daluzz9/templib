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
  systemPlan,
  hasJoinPromotion,
  amountRolling,
} = useWithdrawCrypto();
</script>

<template>
  <ClientOnly>
    <section>
      <AccountOverviewLayout class="h-10 min-h-[666px] w-full grid-cols-account-layout-v2">
        <template #left>
          <div class="relative flex flex-col rounded-[8px] bg-background-bg-section_main px-6 pb-6 pt-3">
            <Teleport to="#block-withdraw">
              <BlockDeposit
                v-if="systemPlan && hasJoinPromotion"
                :plan="systemPlan"
                show-button
                class="mb-5 w-full"
                @cancel-promotion="() => {}"
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
                    trước khi rút tiền qua Tiền Ảo.
                  </p>
                </template>
              </BlockDeposit>
            </Teleport>

            <div v-if="hasJoinPromotion" class="mb-5 h-[90px] w-full" />

            <div class="mb-5 h-[42px] w-full" />

            <div>
              <div :class="cn('mb-2 text-sm font-semibold text-text-primary')">Mạng lưới</div>
              <NetworkCrypto :currencies="currencies" @change-network="changeCryptoNetwork">
                <template #nameNetwork="{ item }">
                  {{ `${item.token} - ${item.network[0]}` }}
                </template>
                <template #price="{ item }">
                  1 {{ item.token }} =
                  {{ formatVNDCurrency(item?.buy_price) }}
                </template>
              </NetworkCrypto>
            </div>

            <div class="my-5 flex flex-col gap-4">
              <div class="flex flex-col">
                <Form
                  id="withdrawCryptoForm"
                  v-slot="{ errors, isSubmitting }"
                  :validation-schema="withdrawCryptoValidationSchema"
                  :initial-values="formData"
                  class="flex flex-col"
                  @submit="submitFormWithdraw"
                >
                  <FormField v-slot="{ componentField }" name="amount">
                    <FormItem class="mb-4">
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
                        <InputText
                          v-model="formData.wallet_address"
                          type="text"
                          :maxlength="50"
                          placeholder=""
                          class="h-12"
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
                        </InputText>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </FormField>

                  <Button
                    :disabled="Object.keys(errors).length || amountWithdraw <= 0 || !formData.wallet_address"
                    type="submit"
                    form="withdrawCryptoForm"
                    :class="
                      cn(
                        'bg-comps-tab-payment-bg-disabled mx-auto mt-5 inline-flex h-12 w-[250px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg px-4 py-2 text-center text-base font-bold capitalize leading-snug',
                        Object.keys(errors).length || amountWithdraw <= 0 || !formData.wallet_address
                          ? 'bg-comps-tab-payment-bg-disabled text-neutral-400 disabled:border-neutral-600'
                          : 'bg-primary-400 text-white hover:border-primary-500 hover:bg-primary-500',
                      )
                    "
                    :is-loading="isSubmitting"
                  >
                    Rút Tiền
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </template>

        <template #right>
          <div :class="cn('flex flex-col rounded-[8px] bg-background-bg-section_main px-6 pb-6 pt-6')">
            <div class="flex flex-col rounded-[8px] bg-background-bg-section_main pb-5">
              <p class="mb-3 text-base font-semibold leading-[22px] text-text-primary">
                3 Bước kiểm tra, rút tiền nhanh chóng
              </p>
              <GuideList :guide-list="cryptoGuideList" />
            </div>

            <PlatForm />
          </div>
        </template>
      </AccountOverviewLayout>
    </section>
  </ClientOnly>
</template>

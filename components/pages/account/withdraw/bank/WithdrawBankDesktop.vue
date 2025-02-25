<script setup lang="ts">
import { withdrawBankGuideList } from "../withdraw-static";

const appStore = useAppStore();
const { isUserBankAvailable, hasJoinPromotion, systemPlan, amountRolling } = storeToRefs(appStore);

const {
  bankCodeSelected,
  selectedBank,
  mappedUserBankList,
  convertUnitToVND,
  formWithdrawBank,
  isWithdrawBankDisabled,
  withdrawBankFormSchema,
  submitFormWithdrawBank,
} = useWithdrawBank();

const dialogBlockDeposit = useDialog();
</script>

<template>
  <section class="h-full">
    <DialogBlockDeposit v-if="dialogBlockDeposit.isOpen.value" :controller="dialogBlockDeposit" />
    <AccountOverviewLayout class="h-full w-full grid-cols-account-layout-v2">
      <template #left>
        <div v-if="!isUserBankAvailable" class="rounded-lg bg-background-menu-account p-6 pt-3">
          <div class="mb-[50px] h-[42px] w-full" />
          <AccountBankEmpty />
        </div>
        <div v-else class="rounded-lg bg-background-menu-account p-6 pt-3">
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
                  trước khi rút tiền qua Ngân hàng.
                </p>
              </template>
            </BlockDeposit>
          </Teleport>
          <div v-if="hasJoinPromotion" class="mb-5 h-[90px] w-full" />
          <!-- Sub menu each deposit method -->
          <div class="mb-5 h-[42px] w-full" />
          <Form
            v-slot="{ errors, isSubmitting }"
            :initial-values="formWithdrawBank"
            :validation-schema="withdrawBankFormSchema"
            @submit="submitFormWithdrawBank"
          >
            <div class="mb-6">
              <FormField name="bank">
                <FormItem>
                  <div class="flex items-center justify-between">
                    <FormLabel class="font-semibold text-text-primary">Ngân Hàng</FormLabel>
                    <AddBankDialog v-if="(mappedUserBankList?.length || 0) < NUMBER_OF_BANK_LIMIT">
                      <template #trigger="{ openDialog }">
                        <button type="button" class="min-h-5 text-xs text-primary-300 underline" @click="openDialog()">
                          Thêm ngân hàng
                        </button>
                      </template>
                    </AddBankDialog>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      :class="
                        cn('w-full rounded-lg border border-input-border', {
                          'data-[state=open]:border-input-focus-border': isDropdownVisible(mappedUserBankList || []),
                        })
                      "
                    >
                      <DropdownMenuToggle :is-show-arrow="isDropdownVisible(mappedUserBankList || [])" class="h-12">
                        <div v-if="selectedBank" class="flex items-center gap-2">
                          <Image
                            :src="selectedBank.img"
                            alt="logo"
                            width="32px"
                            height="32px"
                            :preload="true"
                            img-class="object-contain"
                          />
                          <p>{{ selectedBank.display }}</p>
                        </div>
                        <div v-else>Chọn Ngân Hàng</div>
                      </DropdownMenuToggle>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent v-if="isDropdownVisible(mappedUserBankList || [])" class="max-h-full">
                      <DropdownMenuRadioGroup v-model="bankCodeSelected">
                        <DropdownItemWIcon
                          v-for="bank in mappedUserBankList || []"
                          :key="bank.bank_code"
                          :value="bank.bank_code"
                          :is-icon-left="true"
                          :label="bank.display"
                          :icon="bank.img"
                        />
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <FormMessage />
                </FormItem>
              </FormField>
            </div>

            <div class="mb-6">
              <FormField v-slot="{ componentField }" name="amount_withdraw">
                <FormItem>
                  <FormLabel class="font-semibold">Số tiền rút (K)</FormLabel>
                  <FormControl>
                    <InputMaskNumber
                      v-model="formWithdrawBank.amount_withdraw"
                      :name="componentField.name"
                      class="h-12"
                      placeholder=""
                      :max-length="BANK_WITHDRAWAL_RANGE.MAX"
                    >
                      <template #suffix>
                        <span
                          :class="
                            cn(
                              'text-sm',
                              formWithdrawBank.amount_withdraw > 0 ? 'text-secondary' : 'text-text-secondary',
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
            </div>

            <div class="flex justify-center">
              <Button
                :disabled="Object.keys(errors).length || isWithdrawBankDisabled || isSubmitting"
                :is-loading="isSubmitting"
                type="submit"
                class="h-12 w-[250px] rounded-lg text-base font-bold"
              >
                Rút Tiền
              </Button>
            </div>
          </Form>
        </div>
      </template>
      <template #right>
        <div class="rounded-lg bg-background-menu-account p-6">
          <div v-if="!isUserBankAvailable" class="mb-5">
            <Image src="account/trading-banner.webp" alt="banner" height="448px" width="480px" preload />
          </div>
          <div v-else class="mb-5">
            <p class="mb-3 text-base font-semibold leading-[22px] text-text-primary">Hướng dẫn rút tiền</p>
            <GuideList :guide-list="withdrawBankGuideList" />
          </div>
        </div>
      </template>
    </AccountOverviewLayout>
  </section>
</template>

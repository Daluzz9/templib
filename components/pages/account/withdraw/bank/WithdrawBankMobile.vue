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

const { handlePageBack } = useBackNavigation();
const { openSidebarMenu } = useSidebarMenu();

const handleBack = () => {
  openSidebarMenu(SidebarMenuEnum.ACCOUNT_WITHDRAW);
  handlePageBack();
};
</script>

<template>
  <DialogBlockDeposit v-if="dialogBlockDeposit.isOpen.value" :controller="dialogBlockDeposit" />
  <BlockDepositMobile
    v-if="systemPlan && hasJoinPromotion"
    :plan="systemPlan"
    show-button
    @cancel-promotion="dialogBlockDeposit?.openDialog()"
  >
    <template #rolling>
      <p class="text-sm font-normal text-text-primary">
        Vui lòng hoàn thành số tiền cược yêu cầu
        <span class="text-warning"
          >{{
            formatVNDCurrency(amountRolling / RATE_K_VND, {
              currencySymbol: CurrencySymbolEnum.NONE,
            })
          }}K</span
        >
        trước khi rút tiền qua <span class="capitalize">Ngân hàng</span>.
      </p>
    </template>
  </BlockDepositMobile>

  <AccountBankEmptyMobile v-if="!isUserBankAvailable" title="Rút Qua Ngân Hàng" @back="handleBack()" />
  <Form
    v-else
    v-slot="{ errors, isSubmitting }"
    :initial-values="formWithdrawBank"
    :validation-schema="withdrawBankFormSchema"
    @submit="submitFormWithdrawBank"
  >
    <PageLayoutMobile class="min-h-dvh">
      <template #header>
        <PageHeaderMobile title="Rút Qua Ngân Hàng" @back="handleBack()" />
      </template>
      <template #main>
        <UserBalance class="mb-1" />

        <div class="p-4">
          <div class="mb-4">
            <FormField name="bank">
              <FormItem>
                <div class="mb-[2px] flex items-center justify-between">
                  <FormLabel class="font-semibold text-text-primary">Ngân Hàng</FormLabel>
                  <AddBankDialog v-if="(mappedUserBankList?.length || 0) < NUMBER_OF_BANK_LIMIT">
                    <template #trigger="{ openDialog }">
                      <p class="cursor-pointer text-xs text-primary-300 underline" @click="openDialog()">
                        Thêm Ngân Hàng
                      </p>
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

          <div class="mb-5">
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
                          cn('text-sm', formWithdrawBank.amount_withdraw > 0 ? 'text-secondary' : 'text-text-secondary')
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

          <div>
            <p class="mb-3 text-base font-semibold leading-[22px] text-text-primary">Hướng dẫn rút tiền</p>
            <GuideList :guide-list="withdrawBankGuideList" />
          </div>
        </div>
      </template>
      <template #bottom>
        <div class="bg-background-bg-section_main p-4">
          <Button
            :disabled="Object.keys(errors).length || isWithdrawBankDisabled || isSubmitting"
            :is-loading="isSubmitting"
            type="submit"
            class="h-12 w-full text-base font-bold"
          >
            Rút Tiền
          </Button>
        </div>
      </template>
    </PageLayoutMobile>
  </Form>
</template>

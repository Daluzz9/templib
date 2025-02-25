<script setup lang="ts">
import CodePay from "~/components/pages/account/deposit/banks/CodePay.vue";
import CodePay2 from "~/components/pages/account/deposit/banks/CodePay2.vue";
import { NuxtLink } from "#components";
import { PaymentMethodStatusEnum } from "~/components/atomics/custom/account/payment-method";

const { depositBankMenus } = useAccountMenuDeposit();

const route = useRoute();
const appStore = useAppStore();

const dialogBlockDeposit = useDialog();
const { hasJoinPromotion, systemPlan, amountRolling } = storeToRefs(appStore);

const currentComponent = computed(() => {
  return [APP_PATH.DEPOSIT_CODEPAY, APP_PATH.DEPOSIT_BANK].includes(route.fullPath) ? CodePay : CodePay2;
});

const getMethodStatus = (method: (typeof depositBankMenus.value)[0]) => {
  if (method.isUnderMaintenance) {
    return PaymentMethodStatusEnum.MAINTENANCE;
  }
  if (route.fullPath === method.path) {
    return PaymentMethodStatusEnum.ACTIVE;
  }
  return PaymentMethodStatusEnum.DEFAULT;
};
</script>

<template>
  <div class="deposit-bank h-full">
    <DialogBlockDeposit v-if="dialogBlockDeposit.isOpen.value" :controller="dialogBlockDeposit" />
    <AccountOverviewLayout class="h-full w-full grid-cols-account-layout-v2">
      <template #left>
        <div class="rounded-lg bg-background-menu-account px-6 py-3">
          <!-- Promotion block deposit -->
          <Teleport v-if="systemPlan && hasJoinPromotion" to="#block-deposit">
            <BlockDeposit
              v-if="route.query.type === AccountDepositBankMethodEnum.CODE_PAY.toLowerCase()"
              :plan="systemPlan"
              class="mb-5 w-full"
              show-button
              @cancel-promotion="dialogBlockDeposit?.openDialog()"
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
                  trước khi nạp tiền qua <span class="capitalize">{{ route.query.type }}</span
                  >.
                </p>
              </template>
            </BlockDeposit>
            <BlockDeposit v-else :plan="systemPlan" :show-button="false" class="mb-5 h-[70px] w-full">
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
          <div
            v-if="hasJoinPromotion"
            class="mb-5 w-full"
            :class="`h-[${currentComponent === CodePay2 ? '70px' : '90px'}]`"
          />
          <!-- Sub menu each deposit method -->
          <div class="mb-5 h-[42px] w-full" />
          <template v-if="appStore.isUserBankAvailable">
            <div v-show="appStore.isUserBankAvailable" class="payment-methods mb-5">
              <p class="font-nunito text-sm font-semibold">Cổng nạp</p>
              <div class="mt-2 flex flex-row flex-wrap gap-4">
                <PaymentMethod
                  v-for="method in depositBankMenus"
                  :key="method.path"
                  class="group h-10 w-[180px] hover:border-tab-payment-borderActive"
                  :name="method.name"
                  :is-under-maintenance="method.isUnderMaintenance"
                  :navigate-to="method.path"
                  :as="NuxtLink"
                  :status="getMethodStatus(method)"
                >
                  <component
                    :is="method.icon"
                    :class="
                      cn('text-2xl group-hover:text-primary-300', {
                        'text-primary-300': $route.fullPath === method.path,
                        'text-disable': method.isUnderMaintenance,
                      })
                    "
                  />
                </PaymentMethod>
              </div>
            </div>
            <component :is="currentComponent" />
          </template>
          <AccountBankEmpty v-else class="pt-[30px]" />
        </div>
      </template>
      <template #right>
        <div class="rounded-lg bg-background-menu-account p-6">
          <Image
            v-if="!appStore.isUserBankAvailable"
            src="account/trading-banner.webp"
            alt="banner"
            height="448px"
            width="480px"
            preload
          />
          <div v-show="appStore.isUserBankAvailable" id="deposit-codepay-detail" />
        </div>
      </template>
    </AccountOverviewLayout>
  </div>
</template>

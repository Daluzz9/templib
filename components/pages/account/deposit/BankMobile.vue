<script setup lang="ts">
import CodePay from "~/components/pages/account/deposit/banks/CodePayMobile.vue";
import CodePay2 from "~/components/pages/account/deposit/banks/CodePay2Mobile.vue";

const appStore = useAppStore();
const { hasJoinPromotion, systemPlan, amountRolling } = storeToRefs(appStore);
const route = useRoute();

const dialogBlockDeposit = useDialog();

const currentComponent = computed(() => {
  return [APP_PATH.DEPOSIT_CODEPAY, APP_PATH.DEPOSIT_BANK].includes(route.fullPath) ? CodePay : CodePay2;
});
</script>
<template>
  <DialogBlockDeposit v-if="dialogBlockDeposit.isOpen.value" :controller="dialogBlockDeposit" />
  <BlockDepositMobile
    v-if="systemPlan && hasJoinPromotion && currentComponent === CodePay"
    :plan="systemPlan"
    :show-button="route.query.type === AccountDepositBankMethodEnum.CODE_PAY.toLowerCase()"
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
        trước khi nạp tiền qua <span class="capitalize">{{ route.query.type }}</span
        >.
      </p>
    </template>
  </BlockDepositMobile>
  <component :is="currentComponent" />
</template>

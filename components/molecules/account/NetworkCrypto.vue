<script setup lang="ts">
import { Primitive, type PrimitiveProps } from "radix-vue";
type IProps = PrimitiveProps & {
  currencies?: ICryptoV2SysDepositPaymentMethod[];
  isDeposit?: boolean;
};

const props = withDefaults(defineProps<IProps>(), {
  as: "div",
  currencies: () => [],
  isDeposit: false,
});

const emit = defineEmits<{
  changeNetwork: [payload: ICryptoV2SysDepositPaymentMethod];
}>();

const isActive = ref(
  props.isDeposit
    ? props.currencies[0]?.token
    : props.currencies.find((currency: ICryptoV2SysDepositPaymentMethod) => currency.is_support_withdraw)?.token,
);

const handleClickNetwork = (currency: ICryptoV2SysDepositPaymentMethod) => {
  if (currency?.is_under_maintenance || isActive.value === currency?.token) return;
  isActive.value = currency.token;
  emit("changeNetwork", currency);
};

const isNetworkDisabled = (currency: ICryptoV2SysDepositPaymentMethod) => {
  if (props.isDeposit) {
    return false;
  }
  return !currency?.is_support_withdraw;
};
</script>

<template>
  <Primitive :as="as" class="network-list grid grid-cols-3 gap-[6px] sm:gap-4">
    <div
      v-for="(currency, index) in currencies"
      :key="currency.token"
      :class="
        cn(
          'group relative flex h-12 items-center justify-center gap-2 rounded-lg border border-solid border-border-primary bg-tab-payment-borderInactive px-8 py-2 hover:cursor-pointer hover:border-tab-payment-borderActive sm:h-[54px]',
          isActive === currency?.token && 'border-tab-payment-borderActive',
          isNetworkDisabled(currency) && 'pointer-events-none border-none bg-tab-payment-bgDisabled',
        )
      "
      @click="handleClickNetwork(currency)"
    >
      <div v-if="isNetworkDisabled(currency)" class="absolute right-0 top-0">
        <div
          class="flex h-3.5 w-11 items-center justify-center rounded-bl-lg rounded-tr-lg bg-neutral-500 text-[8px] font-bold uppercase leading-3 text-text-primary"
        >
          Bảo trì
        </div>
      </div>
      <div class="left" :class="{ 'grayscale-[1]': isNetworkDisabled(currency) }">
        <Image :src="`account/icon-${currency.token.toLowerCase()}.webp`" alt="icon" width="24px" />
      </div>
      <div class="right flex flex-col items-start justify-center gap-0">
        <span
          :class="
            cn(
              'block text-sm font-semibold tracking-[1px] text-tab-payment-fgInactive group-hover:text-tab-payment-fgActive sm:text-base',
              isActive === currency?.token && 'text-tab-payment-fgActive',
              isNetworkDisabled(currency) && 'text-tab-payment-fgDisabled',
            )
          "
        >
          <slot name="nameNetwork" :item="currency" :index="index" />
        </span>
        <span
          :class="
            cn(
              'text-nowrap text-xs font-normal group-hover:text-tab-payment-fgActive',
              isActive === currency?.token && 'text-tab-payment-fgActive',
              isNetworkDisabled(currency) && 'text-tab-payment-fgDisabled',
            )
          "
        >
          <slot name="price" :item="currency" :index="index" />
        </span>
      </div>
    </div>
  </Primitive>
</template>

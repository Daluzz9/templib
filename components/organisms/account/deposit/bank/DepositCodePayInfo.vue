<script lang="ts" setup>
import dayjs from "dayjs";

const props = defineProps({
  packageId: {
    type: Number,
    default: 0,
  },
  amountDeposit: {
    type: Number,
    default: 0,
  },
});

const el = ref<HTMLElement | undefined>(undefined);

const appStore = useAppStore();
const { mappedPackages } = storeToRefs(appStore);

const promotionSelected = computed(() => {
  if (mappedPackages.value === undefined || mappedPackages.value === null) {
    return;
  }
  return mappedPackages.value.find((item) => item.id === props.packageId);
});

const promotionAmount = computed(() => {
  if (props.packageId !== PackageEnum.HOAN_TRA) {
    const amount = props.amountDeposit * (promotionSelected.value?.promotion ?? 0) * RATE_K_VND;
    const maxAmount = promotionSelected.value?.max_amount ?? 0;
    return amount >= maxAmount ? maxAmount : amount;
  }
  return 0;
});

const actualAmount = computed(() => {
  return promotionAmount.value + props.amountDeposit * RATE_K_VND;
});

const rollingAmount = computed(() => {
  if (props.packageId !== PackageEnum.HOAN_TRA) {
    const max = promotionSelected.value?.max_amount || 0;
    const rate = promotionSelected.value?.promotion || 0;
    const maxPromotion = max + max / rate;
    const superfluous = actualAmount.value - maxPromotion > 0 ? actualAmount.value - maxPromotion : 0;
    const multiplier = promotionSelected.value?.multiplier || 0;

    return superfluous > 0 ? multiplier * maxPromotion + superfluous : multiplier * actualAmount.value;
  }
  return 0;
});

const rollingDate = computed(() => {
  return dayjs().add(30, "day").format(DATE_TIME_NEWS_FORMAT);
});

watch(
  () => props.packageId,
  (newVal: number) => {
    if (useDevice().isMobileOrTablet && newVal && promotionAmount.value !== 0) {
      window.scrollBy({
        top: el.value?.offsetTop,
        left: 0,
        behavior: "smooth",
      });
    }
  },
);
</script>
<template>
  <div ref="el" class="flex w-full flex-col gap-2 rounded-lg bg-input-bg p-2">
    <DepositAmountItemInfo label="Khuyến mãi" :value="formatVNDCurrency(promotionAmount)" />
    <DepositAmountItemInfo label="Thực nhận" :value="formatVNDCurrency(actualAmount)" />
    <DepositAmountItemInfo
      label="Vòng cược"
      :value="
        formatVNDCurrency(promotionSelected?.multiplier ?? 0, {
          currencySymbol: CurrencySymbolEnum.NONE,
        })
      "
    />
    <DepositAmountItemInfo label="Cược yêu cầu" :value="formatVNDCurrency(rollingAmount)" />
    <DepositAmountItemInfo
      label="Thời hạn"
      :value="
        useDevice().isMobileOrTablet
          ? `Trong vòng 30 ngày <br /> (đến hạn ${rollingDate})`
          : `Trong vòng 30 ngày (đến hạn ${rollingDate})`
      "
      class="group"
    />
  </div>
</template>

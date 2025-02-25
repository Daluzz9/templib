<script setup lang="ts">
type IProps = {
  cardValue: number;
  feeNumber: number; // fee percentage eg: 12
};

type IItemInfo = {
  label: string;
  value: string;
};

const props = withDefaults(defineProps<IProps>(), {
  cardValue: 0,
  feeNumber: 0,
});

const info = computed<IItemInfo[]>(() => {
  return [
    {
      label: "Mệnh giá thẻ nạp",
      value: formatVNDCurrency(props.cardValue),
    },
    {
      label: "Phí gạch thẻ (nhà mạng thu)",
      value: formatVNDCurrency(props.feeNumber * props.cardValue * 0.01),
    },
    {
      label: "Số tiền thực nhận",
      value: formatVNDCurrency(props.cardValue - props.feeNumber * props.cardValue * 0.01),
    },
  ];
});
</script>

<template>
  <div class="flex w-full flex-col gap-[6px] rounded-lg bg-input-bg px-3 py-2">
    <DepositAmountItemInfo
      v-for="infoItem in info"
      :key="infoItem.label"
      :label="infoItem.label"
      :value="infoItem.value"
      class="py-[2px]"
    />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  amount: {
    type: Number,
    required: true,
  },
  suggestPrices: {
    type: Array<number>,
    required: true,
  },
});

const device = useDevice();

const emit = defineEmits(["selected"]);

const getStatus = (amount: number) => {
  return props.amount === amount ? PriceSelectorStatusEnum.ACTIVE : PriceSelectorStatusEnum.DEFAULT;
};
</script>
<template>
  <div
    class="gap-[6px]"
    :class="device.isMobileOrTablet ? 'grid grid-flow-row-dense grid-cols-3' : 'flex items-center justify-between'"
  >
    <PriceSelector
      v-for="suggestPrice in suggestPrices"
      :key="suggestPrice"
      class="group h-9 w-full lg:h-10"
      :class="{ 'hover:border-tab-payment-borderActive': device.isDesktop }"
      :amount="suggestPrice"
      :status="getStatus(suggestPrice)"
      @click="emit('selected', suggestPrice)"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  rewardPeriods: {
    type: Array as PropType<IRewardPeriod[]>,
  },
});
const { columnsOfTableBonus, isLoading, promotionStatistic, selectedPeriod, rewardPeriodsByPromotion } =
  usePromotionStatistic({
    rewardPeriods: props.rewardPeriods,
  });
</script>
<template>
  <figure class="h-ful w-full rounded-lg bg-[#ffffff12]">
    <div class="relative mb-4 flex w-full items-center justify-center gap-[6px] p-4 pb-0 pt-4">
      <h3 class="flex-1 text-nowrap text-center text-base font-bold leading-[22px] text-[#F9F9F9]">DANH SÁCH THƯỞNG</h3>
      <DropdownMenu v-if="rewardPeriodsByPromotion.length" class="w-[133px] min-w-[133px]">
        <DropdownMenuTrigger class="min-w-[133px h-9 w-[133px] flex-1">
          <DropdownMenuToggle
            class="w-[133px] min-w-[133px] border border-white/10 bg-background-bg-secondary lg:min-h-9"
            >{{ rewardPeriodsByPromotion.find((item) => item.id === selectedPeriod)?.label }}</DropdownMenuToggle
          >
        </DropdownMenuTrigger>
        <DropdownMenuContent
          class="r-thumb-rounded-md rounded-lg border border-white/10 scrollbar-thin scrollbar-track-[transparent] scrollbar-thumb-neutral-500"
          :side-offset="4"
        >
          <DropdownMenuRadioGroup v-model="selectedPeriod">
            <DropdownMenuRadioItem
              v-for="option in rewardPeriodsByPromotion"
              :key="option.id"
              :value="option.id"
              class="relative h-9 w-full text-sm text-text-primary data-[state=checked]:before:absolute data-[state=checked]:before:left-0 data-[state=checked]:before:h-full data-[state=checked]:before:w-[2px] data-[state=checked]:before:bg-primary-400"
            >
              {{ option.label }}
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    <table class="w-full table-fixed">
      <thead>
        <tr class="h-[38px] pb-2">
          <th
            v-for="column in columnsOfTableBonus"
            v-show="column.isShow"
            :key="column.key"
            class="border-b border-b-background-bg-primary text-left text-xs font-normal text-text-secondary [&:first-child]:pl-4 [&:last-child]:pr-4 [&:last-child]:text-right"
            :class="column.class"
          >
            {{ column.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="isLoading">
          <td class="text-left text-base font-bold text-text-primary" colspan="3">
            <LoadingSpinner v-if="isLoading" position="center" class="min-h-[320px] w-full" />
          </td>
        </tr>
        <tr v-else-if="!promotionStatistic?.length">
          <td class="text-left text-base font-bold text-text-primary" colspan="3">
            <PromotionEmpty class="min-h-[320px] w-full" description="Chưa có dữ liệu ở đây, vui lòng quay lại sau !" />
          </td>
        </tr>
        <template v-else>
          <tr
            v-for="(statistic, idx) in promotionStatistic"
            :key="statistic.username"
            class="data h-10 w-full border-b border-b-background-bg-primary"
          >
            <td
              v-for="item in columnsOfTableBonus"
              v-show="item.isShow"
              :key="item.key"
              class="text-left text-xs font-normal text-text-primary [&:last-child]:pr-4 [&:last-child]:text-right [&:last-child]:font-bold [&:last-child]:text-secondary"
              :class="item.class"
            >
              <div v-if="item.key === 'order'" :data-order="idx + 1" class="row-order flex items-center justify-center">
                <span v-if="idx > 2">
                  {{ idx + 1 }}
                </span>
                <Image
                  v-else
                  class="order-bonus"
                  alt="order-bonus"
                  :src="`promotion/order-bonus-${idx + 1}.webp`"
                  width="28px"
                />
              </div>
              <div v-else-if="item.key === 'username'" class="flex items-center gap-2">
                <Image :src="statistic.avatar" width="24px" height="24px" class="rounded-full" />
                <p class="flex flex-col">
                  <span class="line-clamp-1 font-normal">{{ statistic.username }}</span>
                  <span class="line-clamp-1 font-normal text-neutral-300">{{ statistic.match }}</span>
                </p>
              </div>
              <!-- Replace unit VND with empty string -->
              <span v-else>{{ statistic[item.key as keyof typeof statistic]?.toString().replace("VND", "") }}</span>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </figure>
</template>
<style lang="scss" scoped>
.row-order {
  @apply relative h-[34px] w-[67px] bg-[url(/images/promotion/bg-order-bonus.svg)];

  &[data-order="1"] {
    @apply bg-[url(/images/promotion/bg-order-bonus-1.svg)] bg-contain bg-no-repeat;
  }

  &[data-order="2"] {
    @apply bg-[url(/images/promotion/bg-order-bonus-2.svg)] bg-contain bg-no-repeat;
  }

  &[data-order="3"] {
    @apply bg-[url(/images/promotion/bg-order-bonus-3.svg)] bg-contain bg-no-repeat;
  }

  span {
    font-size: 1.5rem;
    font-weight: 700;
    background: linear-gradient(180deg, #fff 23.44%, #dbe281 78.12%);
    background-clip: text;
    -webkit-background-clip: text;
    position: absolute;
    text-align: center;
    -webkit-text-fill-color: transparent;
  }
}
</style>

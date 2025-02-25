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
  <figure class="h-ful w-full">
    <div class="relative mb-4 w-full">
      <h3 class="flex h-9 items-center justify-center gap-4">
        <SvgoStar :font-controlled="false" class="[&_path]:fill-[#F9A62E]" />
        <span class="text-2xl font-bold text-[#F9F9F9]">DANH SÁCH THƯỞNG</span>
        <SvgoStar :font-controlled="false" class="[&_path]:fill-[#F9A62E]" />
      </h3>
      <DropdownMenu v-if="rewardPeriodsByPromotion.length" class="min-w-[200px]">
        <DropdownMenuTrigger class="absolute right-0 top-[-2px] h-9 flex-1">
          <DropdownMenuToggle class="min-w-[200px] border border-white/10 lg:min-h-9">{{
            rewardPeriodsByPromotion.find((item) => item.id === selectedPeriod)?.label
          }}</DropdownMenuToggle>
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
    <table class="w-full table-fixed border-separate border-spacing-y-2">
      <thead>
        <tr class="h-[38px] py-2">
          <th
            v-for="column in columnsOfTableBonus"
            :key="column.key"
            class="text-left text-base font-normal text-text-secondary [&:last-child]:text-right"
          >
            {{ column.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="isLoading" class="h-[50px] py-2">
          <td class="text-left text-base font-bold text-text-primary" colspan="4">
            <LoadingSpinner v-if="isLoading" position="center" class="min-h-[412px] w-full" />
          </td>
        </tr>
        <tr v-else-if="!promotionStatistic?.length" class="h-[50px] py-2">
          <td class="text-left text-base font-bold text-text-primary" colspan="4">
            <PromotionEmpty class="min-h-[412px] w-full" description="Chưa có dữ liệu ở đây, vui lòng quay lại sau !" />
          </td>
        </tr>
        <template v-else>
          <tr
            v-for="(statistic, idx) in promotionStatistic"
            :key="statistic.username"
            class="data h-[50px] w-full py-2"
          >
            <td
              v-for="item in columnsOfTableBonus"
              :key="item.key"
              class="text-left text-base text-text-primary [&:last-child]:text-right [&:last-child]:font-bold [&:last-child]:text-secondary"
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
              <p v-else-if="item.key === 'username'" class="flex items-center gap-2">
                <Image :src="statistic.avatar" width="34.5px" height="34.5px" class="rounded-full" />
                <span>{{ statistic.username }}</span>
              </p>
              <span v-else>{{ statistic[item.key as keyof typeof statistic] }}</span>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </figure>
</template>
<style lang="scss" scoped>
table {
  tbody {
    tr {
      &.data:nth-child(-n + 3) {
        background: linear-gradient(
          90deg,
          rgba(70, 73, 86, 0),
          rgba(65, 68, 84, 0.28) 33.33%,
          rgba(75, 78, 88, 0.28) 66.67%,
          rgba(68, 70, 78, 0)
        );
      }
    }
  }
}
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

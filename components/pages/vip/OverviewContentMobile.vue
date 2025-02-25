<script setup lang="ts">
const { levelItems, isLoading, isError, gameRateTableData, userRank } = usePromotionVip();
</script>
<template>
  <OverviewLayoutMobile :is-loading="isLoading">
    <template #levels>
      <VipTitle title="Thưởng lên hạng" />
      <div class="mb-2 mt-3 flex gap-2">
        <ProcessLevelItem
          v-for="levelItem in levelItems.slice(0, 3)"
          :key="levelItem.levelLabel"
          :level-item="levelItem"
          class="aspect-[101/144] p-0"
          image-class="w-[42px] h-[36px] mb-2"
          level-label-class="text-xs font-bold h-5 w-11 mb-2"
          amount-class="text-xs font-bold pb-2 mb-[2px]"
          des-label-class="text-2xs font-normal mb-[22px]"
        />
      </div>

      <div class="flex flex-row-reverse gap-2">
        <ProcessLevelItem
          v-for="levelItem in levelItems.slice(3, 5)"
          :key="levelItem.levelLabel"
          :level-item="levelItem"
          class="aspect-[155/158] p-0"
          image-class="w-[51px] h-[44px] mb-2"
          level-label-class="text-xs font-bold h-5 w-11 mb-2"
          amount-class="text-sm font-bold mb-[2px]"
          des-label-class="text-2xs font-normal mb-[22px]"
        />
      </div>
    </template>

    <template #table>
      <!-- TODO: Sion handle later -->
      <template v-if="isError"></template>
      <template v-else>
        <div v-if="userRank" class="flex flex-col text-center text-sm font-semibold text-text-primary">
          <span
            >Chúc mừng, bạn đang ở hạng <span class="font-bold text-primary-300">VIP {{ userRank + 1 }}</span></span
          >
          <span>Bạn nhận được đặc quyền hoàn trả tương ứng là:</span>
        </div>
        <VipTitle v-else title="ĐẶC QUYỀN HOÀN TRẢ VIP" />

        <div class="mt-3">
          <RefundRangeTable
            :table-data="gameRateTableData"
            :active-level="userRank || undefined"
            header-title-class="text-sm font-bold first:font-semibold"
            content-title-class="font-normal text-sm h-9"
          />
        </div>
      </template>
    </template>
  </OverviewLayoutMobile>
  <slot v-if="!isLoading" name="action"></slot>
</template>

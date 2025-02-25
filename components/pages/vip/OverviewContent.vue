<script setup lang="ts">
const { gameRateTableData, levelItems, userRank, isLoading, isError } = usePromotionVip();
</script>
<template>
  <OverviewLayoutDesktop :is-loading="isLoading">
    <!-- TODO: Sion handle Error -->
    <template v-if="isError"></template>
    <template #levels>
      <VipTitle title="Thưởng lên hạng" />
      <div class="mt-4 flex flex-row gap-6">
        <ProcessLevelItem v-for="levelItem in levelItems" :key="levelItem.levelLabel" :level-item="levelItem" />
      </div>
    </template>

    <template #table>
      <div v-if="userRank" class="flex flex-col text-center text-base font-semibold text-text-primary">
        <span
          >Chúc mừng, bạn đang ở hạng:
          <span class="font-bold text-primary-300">VIP {{ (userRank ?? -1) + 1 }}</span></span
        >
        <span>Bạn nhận được đặc quyền hoàn trả tương ứng là:</span>
      </div>
      <VipTitle v-else title="ĐẶC QUYỀN HOÀN TRẢ VIP" />

      <div class="mt-4">
        <RefundRangeTable :table-data="gameRateTableData" :active-level="userRank ?? -1" />
      </div>
    </template>
  </OverviewLayoutDesktop>
  <slot v-if="!isLoading" name="action"></slot>
</template>

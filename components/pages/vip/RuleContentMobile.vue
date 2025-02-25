<script setup lang="ts">
const { gameRateTableData, userRank, isLoading, levelItems } = usePromotionVip();
</script>
<template>
  <div class="rounded-lg bg-background-secondary p-3">
    <RankVipMobile :level-items="levelItems" />

    <LoadingSpinner v-if="isLoading" class="mt-6" />
    <RefundRangeTable v-else :table-data="gameRateTableData" :active-level="userRank ?? -1" class="mt-6" />
  </div>
  <slot v-if="!isLoading" name="action" />
</template>

<script setup lang="ts">
type IProps = {
  bonusItem: IBonusItem;
};
defineProps<IProps>();

const { isCommission, goToPromotion, userRank, hasPromotion } = useBonus();
</script>

<template>
  <div class="mt-4 flex h-full flex-col">
    <EmptyCard
      v-if="!hasPromotion"
      icon="account/bonus/empty.webp"
      title="Bạn chưa tham gia khuyến mãi nào!"
      class="flex min-h-[250px] w-full flex-col items-center pt-6"
    >
      <template #cta>
        <Button class="mt-6 h-8 w-[119px] rounded-lg text-center text-xs capitalize" @click="goToPromotion"
          >tham gia ngay</Button
        >
      </template>
    </EmptyCard>
    <BonusDetailLayout v-else class="flex flex-col px-6 pt-2">
      <template #title>Khuyến mãi của bạn:</template>
      <template #left-content>
        <BonusDetailInfo class="w-full" :bonus-infos="bonusItem.overviews" />
      </template>
      <template #right-content>
        <div>
          <span v-if="isCommission && userRank !== null" class="h-[38px] text-base font-normal text-primary"
            >Bảng tỉ lệ thưởng: <span class="text-primary-300">VIP {{ userRank + 1 }}</span></span
          >
          <BonusDetailInfo :bonus-infos="bonusItem.details" />
        </div>
      </template>
    </BonusDetailLayout>
  </div>
</template>

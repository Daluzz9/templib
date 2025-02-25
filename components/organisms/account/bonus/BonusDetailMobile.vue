<script setup lang="ts">
type IProps = {
  bonusItem: IBonusItem;
};
defineProps<IProps>();

const { promotionName, goToPromotion, hasPromotion, isCommission } = useBonus();
</script>

<template>
  <div class="flex flex-col">
    <EmptyCard
      v-if="!hasPromotion"
      icon="account/bonus/empty.webp"
      title="Bạn chưa tham gia khuyến mãi nào!"
      class="flex w-full flex-col items-center pt-6"
      title-class="mt-3"
    >
      <template #cta>
        <Button
          class="absolute bottom-4 left-4 right-4 mt-6 h-12 rounded-lg text-center text-base font-bold capitalize"
          @click="goToPromotion"
          >tham gia ngay</Button
        >
      </template>
    </EmptyCard>
    <BonusDetailLayoutMobile v-else>
      <template #top-content>
        <span class="flex h-[38px] items-center font-nunito text-base font-semibold text-primary">{{
          promotionName
        }}</span>
        <BonusDetailInfo :bonus-infos="bonusItem.overviews" />
      </template>
      <template #bottom-content>
        <span v-if="isCommission" class="font-base flex h-[38px] items-center font-nunito text-sm text-primary"
          >Bảng tỉ lệ thưởng:</span
        >
        <BonusDetailInfo :bonus-infos="bonusItem.details" />
      </template>
    </BonusDetailLayoutMobile>
  </div>
</template>

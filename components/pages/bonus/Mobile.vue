<script setup lang="ts">
const { statisticList, initData, bonusData, systemPlan, hasPromotion } = useBonus();

const { handlePageBack } = useBackNavigation();
const { openSidebarMenu } = useSidebarMenu();
const dialogBlockDeposit = useDialog();

const handleBack = () => {
  openSidebarMenu(SidebarMenuEnum.ACCOUNT_OVERVIEW);
  handlePageBack();
};

onMounted(() => initData());
watch(systemPlan, () => initData());
</script>

<template>
  <DialogBlockDeposit v-if="dialogBlockDeposit.isOpen.value" :controller="dialogBlockDeposit" />
  <BonusLayoutMobile>
    <template #header>
      <PageHeaderMobile title="Tiền thưởng" @back="handleBack()" />
    </template>

    <template #statistics>
      <div class="flex flex-col overflow-hidden rounded-lg bg-background-bg-secondary px-[14px] py-2">
        <CardBonusStatisticMobile
          v-for="statisticItem of statisticList"
          :key="statisticItem.title"
          :bonus-statistic-item="statisticItem"
        >
          <template #cta>
            <Button
              v-if="statisticItem.amount && statisticItem?.actionTitle"
              :variant="'ghost'"
              class="ml-1 h-5 w-0 text-sm font-normal text-negative-500 underline"
              @click="dialogBlockDeposit?.openDialog()"
              >{{ statisticItem.actionTitle }}</Button
            >
          </template>
        </CardBonusStatisticMobile>
      </div>
    </template>

    <template #details>
      <div v-if="hasPromotion" class="mb-2 mt-4 text-sm font-semibold text-primary">Khuyến mãi của bạn:</div>
      <BonusDetailMobile :bonus-item="bonusData" />
    </template>
  </BonusLayoutMobile>
</template>

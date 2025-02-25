<script setup lang="ts">
const { statisticList, initData, bonusData, systemPlan } = useBonus();

const dialogBlockDeposit = useDialog();

onMounted(() => initData());
watch(systemPlan, () => initData());
</script>

<template>
  <DialogBlockDeposit v-if="dialogBlockDeposit.isOpen.value" :controller="dialogBlockDeposit" />
  <div class="mb-8 min-h-[666px] rounded-lg bg-neutral-750 p-6">
    <div class="grid flex-1 grid-cols-[464px_repeat(3,1fr)] gap-4">
      <div
        v-for="statisticItem of statisticList"
        :key="statisticItem.title"
        class="bg-s bg flex h-[168px] flex-1 flex-col items-center rounded-lg bg-background-secondary"
      >
        <CardBonusStatistic :bonus-statistic-item="statisticItem">
          <template #cta>
            <Button
              v-if="statisticItem.amount && statisticItem?.actionTitle"
              :variant="'ghost'"
              class="ml-1 h-5 w-0 text-sm font-semibold text-negative-500 underline"
              @click="dialogBlockDeposit?.openDialog()"
              >{{ statisticItem.actionTitle }}</Button
            >
          </template>
        </CardBonusStatistic>
      </div>
    </div>
    <BonusDetail :bonus-item="bonusData" />
  </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from "vue";

type IProps = {
  bonusInfos: IBonusInfo[];
  class?: HTMLAttributes["class"];
};

const props = defineProps<IProps>();
</script>

<template>
  <div :class="props.class">
    <div
      v-for="bonusInfo in bonusInfos"
      :key="bonusInfo.title"
      class="flex flex-row items-center justify-between"
      :class="[useDevice().isMobileOrTablet ? 'h-[36px]' : 'h-[38px]']"
    >
      <BonusRow
        :label="bonusInfo.title"
        :value="bonusInfo.description"
        :value-class="bonusInfo.desClass"
        :text-size="useDevice().isMobileOrTablet ? 'sm' : 'default'"
      />
    </div>
  </div>
</template>

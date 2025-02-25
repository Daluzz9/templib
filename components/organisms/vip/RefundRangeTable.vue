<script setup lang="ts">
import type { HTMLAttributes } from "vue";

type IProps = {
  tableData: IGameRateTableData;
  activeLevel?: number;
  headerTitleClass?: HTMLAttributes["class"];
  contentTitleClass?: HTMLAttributes["class"];
};

const props = defineProps<IProps>();
const activeIndex = props.tableData.headers?.findIndex((header) => header?.level === props.activeLevel);
</script>

<template>
  <div class="common-border overflow-x-auto rounded-lg text-text-primary md:rounded-xl">
    <table class="w-full min-w-[558px] table-fixed bg-background-bg-secondary">
      <!-- Header Row -->
      <thead>
        <tr>
          <th
            v-for="header in tableData.headers"
            :key="header.title"
            class="common-border sticky-first-item h-[70px] text-center md:h-[72px]"
          >
            <div class="flex flex-col items-center gap-[2px]">
              <Image v-if="header?.icon" :src="header.icon" width="27px" height="24px" />
              <span
                :class="
                  cn('text-base font-bold first:font-semibold', headerTitleClass, {
                    'text-text-money': header.level !== undefined && header.level === activeLevel,
                  })
                "
                >{{ header.title }}</span
              >
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <!-- Data Rows -->
        <tr v-for="row in tableData.rows" :key="row.key" :class="cn('h-[40px] text-center', contentTitleClass)">
          <td class="common-border sticky-first-item first:custom-box-shadow font-semibold">
            {{ row.label }}
          </td>
          <td
            v-for="(rate, index) in row.rates"
            :key="rate"
            class="common-border"
            :class="{ 'text-text-money': index + 1 === activeIndex }"
          >
            {{ rate }}%
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.common-border {
  @apply border border-background-bg-secondary;
}

.sticky-first-item {
  @apply first:z-100 first:shadow-[inset_-1px_0_#ffffff0d] max-md:first:sticky max-md:first:left-0 max-md:first:z-100 max-md:first:w-[98px] max-md:first:bg-[#2F3031];
}
</style>

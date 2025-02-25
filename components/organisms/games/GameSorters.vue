<script lang="ts" setup>
type IProps = {
  sorters: ISortOption[];
};

export type ISortOption = {
  label: string;
  value: string;
  queryUrl?: string;
};

const props = defineProps<IProps>();

const route = useRoute();
const { $device } = useNuxtApp();
const { scrollContainerRef, scrollTo } = useScrollTo("horizontal");

const selectedSort = computed<ISortOption>(() => {
  return props.sorters.find((el) => el.queryUrl === route.query?.sort) || props.sorters[0];
});

const handleSelectSorter = async (index: number, option: ISortOption) => {
  if (selectedSort.value.value === option.value) return;
  scrollTo(index);
  await navigateTo({
    query: {
      ...route.query,
      sort: option.queryUrl,
    },
  });
};
</script>

<template>
  <div
    ref="scrollContainerRef"
    class="flex gap-2"
    :class="[$device.isMobileOrTablet ? 'no-scrollbar flex-nowrap overflow-x-scroll' : 'flex-wrap']"
  >
    <Button
      v-for="(option, index) in sorters"
      :key="option.value"
      :variant="selectedSort.value === option.value ? 'default' : 'dark'"
      class="relative overflow-hidden"
      :class="{ 'flex-shrink-0': $device.isMobileOrTablet }"
      @click="handleSelectSorter(index, option)"
    >
      {{ option.label }}
    </Button>
  </div>
</template>

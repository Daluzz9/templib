<script lang="ts" setup>
type IStaticLayoutProps = {
  defaultValue: string | number | undefined;
  categoryTabs: ICommonTab[];
};
defineProps<IStaticLayoutProps>();
</script>

<template>
  <Tabs class="m-auto h-full w-full max-w-[1344px] px-8 py-6" :default-value="defaultValue">
    <CategoryTabList
      :category-tabs="categoryTabs"
      class="rounded-tl-[12px] rounded-tr-[12px]"
      tab-container-class="min-h-[52px] w-[266px]"
      tab-content-class="uppercase font-bold gap-[7px]"
      icon-class="mt-[2px]"
      :is-prefix-match="true"
    />
    <div class="min-h-[450px] rounded-[8px] rounded-tl-none bg-background-bg-secondary px-6 pb-6 pt-4">
      <slot />
    </div>
  </Tabs>
</template>

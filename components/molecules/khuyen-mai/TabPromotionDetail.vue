<script setup lang="ts">
import { TabsTrigger } from "radix-vue";
defineProps({
  tabs: {
    type: Array as PropType<{ key: string; name: string; icon: string; content?: string }[]>,
    required: true,
  },
});
</script>
<template>
  <Tabs class="w-full justify-start" :default-value="tabs?.[0]?.key">
    <TabsList
      aria-label="tabs tab-event-detail"
      class="flex w-full justify-between gap-2 lg:justify-start"
      :loop="true"
    >
      <TabsTrigger
        v-for="tab in tabs"
        :key="tab.key"
        :value="tab.key"
        class="h-10 w-full items-center justify-center gap-1 rounded-lg bg-background-popup-header px-3 py-1 hover:bg-primary-400 data-[state=active]:bg-primary-400 data-[state=active]:shadow-sm lg:h-full lg:w-auto lg:px-5 lg:py-2"
        :class="tabs.length > 1 ? 'flex' : 'hidden'"
      >
        <div class="flex items-center gap-[6px]">
          <component :is="tab.icon" class="hidden text-2xl lg:inline-block" />
          <h3 class="whitespace-nowrap text-sm font-normal text-white lg:text-base">{{ tab.name }}</h3>
        </div>
      </TabsTrigger>
    </TabsList>
    <!--  Handled sanitize HTML content-->
    <!-- eslint-disable-next-line vue/no-v-text-v-html-on-component -->
    <TabsContent
      v-for="data in tabs"
      :key="data.key"
      :value="data.key"
      class="content-promotion mt-2 rounded-lg bg-background-bg-secondary"
      :class="data.key"
      :force-mount="true"
    >
      <slot :name="data.key">
        <div v-html="sanitizeHTMLContent(data.content)" />
      </slot>
    </TabsContent>
  </Tabs>
</template>
<style lang="scss" scoped>
.content-promotion {
  &.bonus {
    @apply lg:px-6 lg:py-4;
  }
  &:not(.bonus) {
    @apply p-4 lg:mt-6 lg:p-6;
    :deep(*) {
      @apply text-sm text-text-secondary lg:text-base;
      ul,
      ol {
        @apply my-4 list-inside list-decimal;
      }
      p {
        strong {
          color: inherit;
        }
      }
      img {
        @apply m-auto flex items-center justify-center rounded-lg;
      }
    }
    :deep(figure) {
      @apply my-4 w-full;
      table {
        @apply w-full rounded-lg bg-background-bg-secondary;
        tr {
          @apply border-b border-b-border-primary [&:last-child]:border-none;
          th,
          td {
            @apply h-9 border-r border-r-border-primary p-1 text-sm text-text-secondary lg:h-[42px] lg:text-base [&:last-child]:border-none;
          }
        }
      }
    }
  }
}
</style>

<script setup lang="ts">
defineProps({
  levelItems: {
    type: Array as PropType<
      { levelLabel: string; isActive: boolean; amountVND: string; icon: string; description: string }[]
    >,
    required: true,
  },
});
</script>
<template>
  <div class="flex h-[266px] flex-row rounded-lg bg-background-bg-secondary px-10 py-5">
    <template v-for="levelItem in levelItems" :key="levelItem.levelLabel">
      <div
        class="be:true relative flex w-1/5 flex-col items-center justify-end overflow-hidden rounded-xl p-8 before:absolute before:inset-0 before:left-0 before:top-[calc(50%_-_12px)] before:h-3 before:w-1/2 before:-translate-y-1/2 before:transform before:bg-primary-400 after:absolute after:right-0 after:top-[calc(50%_-_12px)] after:h-3 after:w-1/2 after:-translate-y-1/2 after:transform after:bg-primary-400 [&:first-child]:before:left-1/4 [&:first-child]:before:w-full [&:first-child]:before:rounded-[6px] [&:last-child]:after:w-0"
        :class="{ 'pb-5 pt-4': levelItem.isActive }"
      >
        <div
          class="pb-[14px] text-xl font-bold [text-shadow:_0_2px_0_#14192f]"
          :class="levelItem.isActive ? 'pb-[22px] text-text-money' : 'text-text-primary'"
        >
          {{ levelItem.amountVND }}
        </div>
        <Image
          :src="levelItem.icon"
          :alt="levelItem.levelLabel"
          class="relative z-20 mb-[14px] before:absolute before:inset-0 before:left-1/2 before:top-1/2 before:z-10 before:hidden before:h-[70px] before:w-20 before:-translate-x-1/2 before:-translate-y-1/2 before:transform before:bg-[url(/images/vip/light.webp)] before:bg-contain"
          :width="levelItem.isActive ? '66px' : '48px'"
          :height="levelItem.isActive ? '58px' : '42px'"
          :class="levelItem.isActive ? 'before:block' : undefined"
          preload
          :show-placeholder="false"
        />
        <div
          class="mb-3 flex h-5 w-20 items-center justify-center rounded-2xl border-[1px] border-solid border-[rgba(6,6,6,0.8)] bg-neutral-50 text-center text-sm font-bold text-black"
        >
          {{ levelItem.levelLabel }}
        </div>
        <div class="text-sm font-normal text-text-secondary">
          {{ levelItem.description.replace("Nạp 0 K", "Người mới") }}
        </div>
        <Image
          v-if="levelItem.isActive"
          src="vip/bg-active-level.webp"
          alt="bg-level"
          class="absolute inset-0"
          preload
          :show-placeholder="false"
        />
      </div>
    </template>
  </div>
</template>

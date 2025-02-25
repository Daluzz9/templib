<script setup lang="ts">
const { isLoggedIn } = useCurrentUser();

const { levelItems, userRank } = usePromotionVip();

const levelVip = computed(() => (isLoggedIn.value ? (userRank.value || 0) + 1 : -1));
</script>
<template>
  <div
    class="vip-wrapper relative flex flex-row flex-wrap rounded-lg bg-background-bg-secondary p-3"
    :data-vip="levelVip"
  >
    <template v-for="levelItem in levelItems" :key="levelItem.levelLabel">
      <div
        class="vip-detail relative isolate z-[4] flex h-[126px] min-w-[calc(100%/3)] flex-1 flex-col items-center justify-end overflow-hidden rounded-xl py-2"
        :data-vip="levelVip"
      >
        <div
          class="isolate pb-1 text-center text-xs font-bold [text-shadow:_0_2px_0_#14192f]"
          :class="levelItem.isActive ? 'text-text-money' : 'text-text-primary'"
        >
          <span>{{ levelItem.amountVND }}</span>
        </div>
        <Image
          :src="levelItem.icon"
          :alt="levelItem.levelLabel"
          class="relative mb-1"
          :width="'37px'"
          :height="'32px'"
          :show-placeholder="false"
        />
        <div
          class="mb-[1px] flex h-5 w-11 items-center justify-center rounded-xl border-[1px] border-solid border-[rgba(6,6,6,0.8)] bg-neutral-50 text-center text-xs font-bold text-black"
        >
          {{ levelItem.levelLabel }}
        </div>
        <div class="text-center text-[10px] font-normal text-text-secondary">
          <p>Nạp</p>
          <p>{{ levelItem.description.replace("Nạp 0 K", "Người mới").replace("Nạp", "") }}</p>
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
<style lang="scss" scoped>
.vip-wrapper {
  @apply after:absolute after:right-3 after:top-[calc(50%_-_20px)] after:h-[135px] after:w-1/4 after:-translate-y-1/2 after:transform after:rounded-br-3xl after:rounded-tr-3xl after:border-b-8 after:border-r-8 after:border-t-8 after:border-b-disable after:border-r-disable after:border-t-disable;
  &[data-vip="5"],
  &[data-vip="4"] {
    @apply after:border-b-primary-400 after:border-r-primary-400 after:border-t-primary-400;
  }
}
.vip-detail {
  @apply before:absolute before:inset-0 before:left-0 before:top-[calc(50%_-_20px)] before:z-[1] before:h-2 before:w-1/2 before:-translate-y-1/2 before:transform before:bg-disable after:absolute after:right-0 after:top-[calc(50%_-_20px)] after:h-2 after:w-1/2 after:-translate-y-1/2 after:transform after:bg-disable [&:first-child]:before:w-0 [&:last-child]:after:w-1/2;

  &:nth-child(3) {
    @apply after:w-0;
  }

  &:nth-child(4) {
    @apply order-5 after:w-0;
  }

  &:nth-child(5) {
    @apply order-4 before:w-0;
  }

  &[data-vip="2"] {
    &:nth-child(1) {
      @apply after:bg-primary-400;
    }
    &:nth-child(2) {
      @apply before:bg-primary-400;
    }
  }

  &[data-vip="3"] {
    &:nth-child(1) {
      @apply after:bg-primary-400;
    }
    &:nth-child(2) {
      @apply before:bg-primary-400 after:bg-primary-400;
    }
    &:nth-child(3) {
      @apply before:bg-primary-400;
    }
  }

  &[data-vip="4"] {
    &:nth-child(1) {
      @apply after:bg-primary-400;
    }
    &:nth-child(2) {
      @apply before:bg-primary-400 after:bg-primary-400;
    }
    &:nth-child(3) {
      @apply before:bg-primary-400 after:bg-primary-400;
    }
    &:nth-child(4) {
      @apply after:bg-primary-400;
    }
  }

  &[data-vip="5"] {
    &:nth-child(1) {
      @apply after:bg-primary-400;
    }
    &:nth-child(2) {
      @apply before:bg-primary-400 after:bg-primary-400;
    }
    &:nth-child(3) {
      @apply before:bg-primary-400 after:bg-primary-400;
    }
    &:nth-child(4) {
      @apply before:bg-primary-400 after:bg-primary-400;
    }
    &:nth-child(5) {
      @apply before:bg-primary-400 after:bg-primary-400;
    }
  }
}
</style>

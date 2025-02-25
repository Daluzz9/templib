<script setup lang="ts">
import { TOTAL_GAMES_LIVECASINO_INJECTION_KEY } from "./injectionKeys";
const { aliases, currentAlias, currentBannerSrc, fetch: fetchAliases } = useGameAliases({ type: GameTypeEnum.CASINO });
const totalItems = ref<number>();

await useAsyncData(async () => {
  await fetchAliases();
  return {};
});

const updateTotalItems = (totalItemsVal: number) => {
  totalItems.value = totalItemsVal;
};
provide(TOTAL_GAMES_LIVECASINO_INJECTION_KEY, { updateTotalItems });
</script>

<template>
  <section v-if="currentAlias">
    <button class="relative aspect-[12/1] min-h-[120px] w-full">
      <Image :src="currentBannerSrc" width="100%" height="100%" alt="banner livecasino">
        <template #sub="{ isLoaded: isBannerLoaded }">
          <div
            v-if="isBannerLoaded"
            class="absolute left-1/2 top-1/2 z-image-overlay -translate-x-1/2 -translate-y-1/2"
          >
            <p class="banner-text">{{ currentAlias.display_name }}</p>
            <p v-if="totalItems">{{ totalItems }} {{ totalItems > 1 ? "Games" : "Game" }}</p>
          </div>
        </template>
      </Image>
    </button>

    <div class="container flex min-h-[650px] flex-1 flex-col gap-4 py-4">
      <GameAliases :aliases="aliases" />

      <GameProviders :providers="currentAlias.providers" />

      <NuxtPage />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.banner-text {
  background: linear-gradient(180deg, #fffcf6 28.89%, #d2c579 39.78%, #f7ecb9 47.87%, #ffefad 57.2%, #ffd000 91.11%);
  color: transparent;
  @apply bg-clip-text font-utm-copperplate text-2xl font-bold;
}
</style>

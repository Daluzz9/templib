<script setup lang="ts">
import { TOTAL_GAMES_INJECTION_KEY } from "./injectionKeys";
const { getJackpotSummaryByAlias } = useJackpot();

const { currentAlias, currentBannerSrc, fetch: fetchAliases } = useGameAliases({ type: GameTypeEnum.GAME });

await useAsyncData(async () => {
  await fetchAliases();
  return {};
});

const totalItems = ref<number>();
const totalGameLobby = ref<number>();
const updateTotalItems = (totalItemsValue: number, totalGameLobbyValue: number) => {
  totalItems.value = totalItemsValue;
  totalGameLobby.value = totalGameLobbyValue;
};
provide(TOTAL_GAMES_INJECTION_KEY, { updateTotalItems });
</script>

<template>
  <section v-if="currentAlias">
    <button class="relative aspect-[12/1] min-h-[120px] w-full">
      <Image :src="currentBannerSrc" width="100%" height="100%" :alt="currentAlias.display_name" loading="eager">
        <template #sub="{ isLoaded: isBannerLoaded }">
          <div
            v-if="isBannerLoaded"
            :key="currentAlias.alias"
            class="absolute left-1/2 top-1/2 z-image-overlay -translate-x-1/2 -translate-y-1/2"
          >
            <p class="banner-text">{{ currentAlias.display_name }}</p>
            <div
              v-if="getJackpotSummaryByAlias(currentAlias.alias) && currentAlias.alias !== GameAliasEnum.TABLE_GAME"
              class="relative flex items-center justify-center"
            >
              <Image src="jackpot-container.webp" width="158px" height="54px" :show-placeholder="false">
                <template #sub="{ isLoaded }">
                  <div class="absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2">
                    <AnimatedNumber
                      v-if="isLoaded"
                      :value="getJackpotSummaryByAlias(currentAlias.alias)"
                      :init-number="0"
                      class="-mt-1 font-bold text-white"
                    />
                  </div>
                </template>
              </Image>
            </div>
            <p v-else-if="totalItems">{{ totalItems }} {{ totalItems > 1 ? "Games" : "Game" }}</p>
          </div>
        </template>
      </Image>
    </button>

    <div class="container flex min-h-[650px] flex-1 flex-col gap-4 py-4">
      <GameProviders :providers="currentAlias.providers" />

      <GameSorters v-if="totalGameLobby && totalGameLobby > 9" :sorters="gameSortOptionsPC" />

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

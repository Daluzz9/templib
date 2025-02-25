<script setup lang="ts">
import { TOTAL_GAMES_LIVECASINO_INJECTION_KEY } from "../injectionKeys";
const route = useRoute();
const gameListRef = ref<HTMLElement>();
const injection = inject(TOTAL_GAMES_LIVECASINO_INJECTION_KEY);

const {
  totalItems,
  games,
  fetchMoreGames,
  fetchGames,
  canLoadMore,
  isFetchingMoreGames,
  countPlaceholders,
  totalLobbyGame,
} = useFetchGames({
  type: GameTypeEnum.CASINO,
  limit: 60,
  alias: (route.params.type as GameAliasEnum) || GameAliasEnum.ALL,
  provider: route.query.provider as string,
  sortBy: getSortByValue(route.query.sort as string),
});

await useAsyncData(async () => {
  await fetchGames();

  return {};
});

const countPlaceholderValue = computed(() => countPlaceholders(6));
watch(
  [totalItems, totalLobbyGame],
  () => {
    injection?.updateTotalItems(totalItems.value, totalLobbyGame.value);
  },
  {
    immediate: true,
  },
);
</script>

<template>
  <div v-if="games?.length" ref="gameListRef" class="grid grid-cols-6 gap-3 xl:gap-4">
    <GameThumb v-for="(game, index) of games" :key="index + game.img" :game="game" />
    <GamePlaceholder v-for="n in countPlaceholderValue" :key="`game-placeholder-${n}`" />
  </div>

  <Button
    v-if="canLoadMore || isFetchingMoreGames"
    class="self-center"
    size="lg"
    :is-loading="isFetchingMoreGames"
    :disabled="isFetchingMoreGames"
    @click="fetchMoreGames"
  >
    Xem thêm</Button
  >

  <GameListEmpty v-if="!games?.length" class="flex-1" />
</template>

<style lang="scss" scoped>
.banner-text {
  background: linear-gradient(180deg, #fffcf6 28.89%, #d2c579 39.78%, #f7ecb9 47.87%, #ffefad 57.2%, #ffd000 91.11%);
  color: transparent;
  @apply bg-clip-text font-utm-copperplate text-2xl font-bold;
}
</style>

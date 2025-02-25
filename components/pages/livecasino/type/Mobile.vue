<script setup lang="ts">
const route = useRoute();

const { games, fetchGames, canLoadMore, isFetchingMoreGames, fetchMoreGames, countPlaceholders } = useFetchGames({
  type: GameTypeEnum.CASINO,
  limit: 60,
  alias: route.params.type as GameAliasEnum,
  provider: route.query.provider as string,
  sortBy: getSortByValue(route.query.sort as string),
});

await useAsyncData(async () => {
  await fetchGames();
  return {};
});

const countPlaceholderValue = computed(() => countPlaceholders(3));
</script>

<template>
  <div class="container">
    <div v-if="games?.length" class="grid grid-cols-3 gap-2">
      <GameThumb v-for="(game, index) of games" :key="index + game.img" :game="game" />
      <GamePlaceholder v-for="n in countPlaceholderValue" :key="`game-placeholder-${n}`" />
    </div>

    <div class="mt-3 text-center">
      <Button
        v-if="canLoadMore || isFetchingMoreGames"
        class="self-center"
        size="lg"
        :is-loading="isFetchingMoreGames"
        :disabled="isFetchingMoreGames"
        @click="fetchMoreGames"
      >
        Xem thêm
      </Button>
    </div>

    <GameListEmpty v-if="!games?.length" class="mt-20" />
  </div>
</template>

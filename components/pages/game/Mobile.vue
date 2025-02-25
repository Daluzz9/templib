<script setup lang="ts">
const { currentAlias, aliases, fetch: fetchAliases } = useGameAliases({ type: GameTypeEnum.GAME });

await useAsyncData(async () => {
  await fetchAliases();
  return {};
});
</script>

<template>
  <section id="game-container" class="flex h-full flex-col gap-3 overflow-y-scroll py-3 [&>*]:flex-shrink-0">
    <GameAliases :aliases="aliases" class="px-3" />

    <GameProviders v-if="currentAlias?.providers" :providers="currentAlias.providers" class="px-3" />

    <div class="flex-1">
      <NuxtPage />
    </div>
  </section>
</template>

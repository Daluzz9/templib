<script lang="ts" setup>
type IProps = {
  games: IGame[];
};

defineProps<IProps>();
</script>

<template>
  <ListWrapper title="Live Casino">
    <div class="pb-2">
      <LivestreamCard :data-live-stream="liveStreamList[0]" />
    </div>
    <div class="grid grid-cols-3 gap-2">
      <GameThumb v-for="game of games" :key="game.name" :game="game" />
    </div>

    <template #sub>
      <NuxtLink :to="APP_PATH.SANH_CASINO">Xem Tất Cả</NuxtLink>
    </template>
  </ListWrapper>
</template>

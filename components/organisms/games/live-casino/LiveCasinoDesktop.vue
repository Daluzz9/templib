<script lang="ts" setup>
import { liveCasinoImgFeatured } from "./static";
type IProps = {
  games: IGame[];
};

defineProps<IProps>();
</script>

<template>
  <ListWrapper title="Live Casino">
    <template #sub>
      <NuxtLink :to="APP_PATH.CASINO" class="font-bold">Xem tất cả</NuxtLink>
    </template>
    <div class="grid grid-cols-3 gap-4 pb-6">
      <div v-for="streamInfo in liveStreamList" :key="streamInfo.id">
        <LivestreamCard :data-live-stream="streamInfo" />
      </div>
    </div>

    <div class="grid grid-cols-[1fr,_66%] gap-10">
      <Image
        :src="liveCasinoImgFeatured"
        alt="live-casino"
        img-class="object-contain"
        width="100%"
        use-padding
        height="79.3%"
      />

      <div class="grid grid-cols-4 gap-4">
        <GameThumb v-for="game of games" :key="game.name" :game="game" />
      </div>
    </div>
  </ListWrapper>
</template>

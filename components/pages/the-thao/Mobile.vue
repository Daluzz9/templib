<script lang="ts" setup>
import { sportCardList } from "./static";
const mappedSportCardList = sportCardList.map((item) => ({
  url: item.url,
  image: item.imageMB,
  name: item.name,
}));
const featuredSportImages = mappedSportCardList.find((item) => item.name === "ksport");
const remainingSportImages = mappedSportCardList.filter((item) => item.name !== "ksport");
</script>

<template>
  <div class="container h-full overflow-y-scroll py-3">
    <div class="grid grid-cols-1 gap-2">
      <NuxtLink :to="featuredSportImages?.url">
        <Image :src="featuredSportImages?.image || ''" show-overlay />
      </NuxtLink>
    </div>
    <div class="grid grid-cols-2 gap-2 pt-2">
      <NuxtLink v-for="sport in remainingSportImages" :key="sport.name" :to="sport.url">
        <Image :src="sport.image" show-overlay class="rounded-lg" />
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { sportCardList } from "./static";
const mappedSportCardList = sportCardList
  .map((item) => ({
    url: item.url,
    image: item.imagePC,
    name: item.name,
  }))
  .filter((item) => item.name !== "matchSchedule");
const matchScheduleBtnImg = sportCardList.find((item) => item.name === "matchSchedule")?.imagePC || "";
</script>

<template>
  <div
    class="mask-fade flex flex-1 items-center bg-[url(/images/sport/sport-background.webp)] bg-cover bg-center bg-no-repeat backdrop-blur-xl backdrop-opacity-50"
  >
    <div class="container flex flex-col items-center justify-center gap-6 py-6">
      <div class="grid grid-cols-4 gap-x-8 gap-y-4">
        <div v-for="sport in mappedSportCardList" :key="sport.name">
          <SportCard :sport-info="sport" />
        </div>
      </div>
      <NuxtLink :to="APP_PATH.MATCH_SCHEDULE">
        <Image
          :src="matchScheduleBtnImg"
          width="239px"
          height="48px"
          class="transition-transform duration-200 hover:scale-[1.05]"
          alt="circle right arrow"
        />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import DialogScheduleFilterMobile from "./components/DialogScheduleFilterMobile.vue";
import { LEAGUE_ALL, LEAGUE_HOT } from "~/components/pages/the-thao/static";

const { isLoading, days, leagues, daySelected, leagueSelected, schedule, onSelectDay, onSelectLeague } = useSchedule({
  leaguesDefault: [LEAGUE_ALL, LEAGUE_HOT],
});
</script>

<template>
  <div class="sticky top-0 z-50 flex items-center justify-between gap-2 bg-[#292D30] py-2 pl-1 pr-3">
    <NuxtLink :to="APP_PATH.SPORT">
      <SvgoArrow
        class="flex-none rotate-180 fill-neutral-400"
        width="32px"
        height="32px"
        :filled="true"
        :font-controlled="false"
      />
    </NuxtLink>
    <span class="mr-auto font-nunito text-sm font-semibold">Lịch Thi Đấu</span>
    <DialogScheduleFilterMobile
      :days="days"
      :day-selected="daySelected"
      :leagues="leagues"
      :league-selected="leagueSelected"
      @on-select-day="onSelectDay"
      @on-select-league="onSelectLeague"
    >
      <template #trigger>
        <Image
          class="flex-none"
          width="32px"
          height="32px"
          src="/sport/sport-schedule/icon-setting.svg"
          alt="icon setting"
        />
      </template>
    </DialogScheduleFilterMobile>
  </div>
  <LoadingSpinner v-if="isLoading" class="absolute" full-height />
  <div
    v-else-if="!isLoading && Object.keys(schedule).length === 0"
    class="absolute left-1/2 top-1/2 flex origin-center -translate-x-1/2 -translate-y-1/2 transform flex-col items-center"
  >
    <Image src="/sport/sport-schedule/empty-data.webp" width="210px" height="120px" />
    <div class="font-nunito text-base font-normal text-neutral-300">Không tìm thấy trận đấu</div>
  </div>
  <template v-else>
    <ScheduleMatchTableMobile
      v-for="matchList in schedule"
      :key="matchList[0].league_name"
      :league-logo="matchList[0].league_image"
      :league-name="matchList[0].league_name"
      :match-list="matchList"
      class="data-[state=collapsed]:mb-3"
    />
  </template>
</template>

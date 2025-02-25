<script setup lang="ts">
import ScheduleHeaderDesktop from "./components/ScheduleHeaderDesktop.vue";
import ScheduleFilterDesktop from "./components/ScheduleFilterDesktop.vue";
import { LEAGUE_ALL, LEAGUE_HOT } from "~/components/pages/the-thao/static";

const { isLoading, days, leagues, daySelected, leagueSelected, schedule, onSelectDay, onSelectLeague } = useSchedule({
  leaguesDefault: [LEAGUE_ALL, LEAGUE_HOT],
});
</script>

<template>
  <div
    class="sticky top-[52px] z-50 bg-[url(/images/sport/sport-schedule/background-header.webp)] bg-cover bg-center bg-no-repeat pb-4 pt-6"
  >
    <div class="container">
      <ScheduleHeaderDesktop />
      <ScheduleFilterDesktop
        :days="days"
        :day-selected="daySelected"
        :leagues="leagues"
        :league-selected="leagueSelected"
        @on-select-day="onSelectDay"
        @on-select-league="onSelectLeague"
      />
    </div>
  </div>
  <div class="relative mb-6 min-h-[560px] bg-[#18191B]">
    <LoadingSpinner v-if="isLoading" class="absolute" full-height />
    <div
      v-else-if="!isLoading && Object.keys(schedule).length === 0"
      class="absolute left-1/2 top-1/2 flex origin-center -translate-x-1/2 -translate-y-1/2 transform flex-col items-center"
    >
      <Image src="/sport/sport-schedule/empty-data.webp" width="210px" height="120px" alt="empty data image" />
      <div class="font-nunito text-base font-normal text-neutral-300">Không tìm thấy trận đấu</div>
    </div>
    <template v-else>
      <div class="container">
        <ScheduleMatchTableDesktop
          v-for="matchList in schedule"
          :key="matchList[0].league_name"
          :league-logo="matchList[0].league_image"
          :league-name="matchList[0].league_name"
          :match-list="matchList"
          class="mb-4"
        />
      </div>
    </template>
  </div>
</template>

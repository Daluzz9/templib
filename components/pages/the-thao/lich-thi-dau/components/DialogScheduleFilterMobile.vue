<script setup lang="ts">
import { TabScheduleFilterEnum } from "~/components/pages/the-thao/static";

type IProps = {
  days: IDayItem[];
  daySelected: IDayItem;
  leagues: ILeague[];
  leagueSelected: ILeague;
};

withDefaults(defineProps<IProps>(), {});

const dialogScheduleFilterController = useDialog();

const activeTab = ref(TabScheduleFilterEnum.LEAGUE);

const handleChangeTab = (tab: TabScheduleFilterEnum) => {
  activeTab.value = tab;
};

const emit = defineEmits<{
  (e: "onSelectLeague", league: ILeague): void;
  (e: "onSelectDay", dayItem: IDayItem): void;
}>();

const handleSelectLeague = (league: ILeague) => {
  emit("onSelectLeague", league);
  dialogScheduleFilterController.closeDialog();
};
const handleSelectDay = (day: IDayItem) => {
  emit("onSelectDay", day);
  dialogScheduleFilterController.closeDialog();
};
</script>

<template>
  <Dialog :controller="dialogScheduleFilterController" :type="DialogTypeEnum.SCHEDULE_FILTER">
    <DialogTrigger as-child>
      <slot name="trigger" />
    </DialogTrigger>
    <DialogContent class="bottom-0 top-auto translate-y-0 gap-0 rounded-none" close-class="h-12 right-3">
      <DialogHeader class="h-12 items-start rounded-t-xl border-white/10 bg-background-popup-header px-4">
        <DialogTitle class="text-base text-neutral-50">Bộ lọc</DialogTitle>
      </DialogHeader>
      <div class="bg-neutral-600">
        <div class="grid grid-cols-2 gap-x-3 p-4">
          <Button
            class="h-auto w-full rounded-lg border-white/10 bg-primary-400/7 py-2 text-base font-semibold leading-[22px] text-neutral-50"
            :class="{ 'bg-primary-400': activeTab === TabScheduleFilterEnum.LEAGUE }"
            @click="handleChangeTab(TabScheduleFilterEnum.LEAGUE)"
          >
            Giải đấu
          </Button>
          <Button
            class="h-auto w-full rounded-lg border-white/10 bg-primary-400/7 py-2 text-base font-semibold leading-[22px] text-neutral-50"
            :class="{ 'bg-primary-400': activeTab === TabScheduleFilterEnum.PERIOD }"
            @click="handleChangeTab(TabScheduleFilterEnum.PERIOD)"
          >
            Thời gian
          </Button>
        </div>
        <div class="h-80 overflow-y-scroll">
          <div v-show="activeTab === TabScheduleFilterEnum.LEAGUE">
            <div
              v-for="league in leagues"
              :key="league.id"
              class="group flex items-center px-4 py-1.5 data-[state=checked]:shadow-[inset_4px_0_0_0_#2189FF]"
              :data-state="leagueSelected.id === league.id ? 'checked' : 'unchecked'"
              @click="handleSelectLeague(league)"
            >
              <Image
                class="flex-none rounded-full"
                width="32px"
                height="32px"
                placeholder-src="/sport/sport-schedule/logo-league-default.svg"
                :src="league.logo"
                :alt="league.name"
              />
              <span class="ml-2 mr-auto line-clamp-1 font-nunito text-sm font-normal text-text-primary">
                {{ league.name }}
              </span>
              <span
                class="flex h-5 w-5 flex-none items-center justify-center rounded-full border border-transparent bg-white/12 group-data-[state=checked]:border-primary-300 group-data-[state=checked]:bg-white/0"
              >
                <span class="hidden h-2.5 w-2.5 rounded-full bg-primary-300 group-data-[state=checked]:block" />
              </span>
            </div>
          </div>
          <div v-show="activeTab === TabScheduleFilterEnum.PERIOD">
            <div
              v-for="day in days"
              :key="day.longDay"
              class="group flex items-center px-4 py-3 data-[state=checked]:shadow-[inset_4px_0_0_0_#2189FF]"
              :data-state="daySelected.longDay === day.longDay ? 'checked' : 'unchecked'"
              @click="handleSelectDay(day)"
            >
              <span class="ml-2 mr-auto line-clamp-1 font-nunito text-sm font-normal text-text-primary">
                {{ `${day.title} - ${day.shortDay}` }}
              </span>
              <span
                class="flex h-5 w-5 flex-none items-center justify-center rounded-full border border-transparent bg-white/12 group-data-[state=checked]:border-primary-300 group-data-[state=checked]:bg-white/0"
              >
                <span class="hidden h-2.5 w-2.5 rounded-full bg-primary-300 group-data-[state=checked]:block" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>

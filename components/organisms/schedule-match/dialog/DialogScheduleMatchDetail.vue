<script setup lang="ts">
import {
  TabOddsEnum,
  LABEL,
  formatMatchDetailData,
  type IFormattedMatchDetailData,
} from "~/components/organisms/schedule-match/static";

type IProps = {
  matchDetail: IMatchDetailData;
};

const props = withDefaults(defineProps<IProps>(), {});

const activeTab = ref(TabOddsEnum.FULlTIME);
const matchInfo = ref<IFormattedMatchDetailData["matchInfo"]>();
const matchRate = ref<IFormattedMatchDetailData["matchRate"]>();
const matchWinRates = ref<IFormattedMatchDetailData["matchWinRates"]>([]);

const setData = (matchData: IFormattedMatchDetailData) => {
  matchInfo.value = matchData.matchInfo;
  matchRate.value = matchData.matchRate;
  matchWinRates.value = matchData.matchWinRates;
};

const handleChangeTab = (tab: TabOddsEnum) => {
  activeTab.value = tab;
  setData(formatMatchDetailData(props.matchDetail, tab));
};

const emit = defineEmits<{
  (e: "viewMatchDetail", matchInfo: IMatchDetailData): void;
  (e: "playSport", matchInfo: IMatchDetailData, matchType: SportProvidersEnum, allowAction?: boolean): void;
}>();

onMounted(() => {
  setData(formatMatchDetailData(props.matchDetail, activeTab.value));
});

const dialogScheduleMatchDetailController = useDialog();
</script>

<template>
  <Dialog :controller="dialogScheduleMatchDetailController" :type="DialogTypeEnum.SCHEDULE_MATCH_DETAIL">
    <DialogTrigger as-child>
      <slot name="trigger" />
    </DialogTrigger>
    <DialogContent class="bottom-0 top-auto translate-y-0 gap-0 rounded-none" close-class="h-12 right-3">
      <DialogHeader class="h-12 items-start rounded-t-xl border-white/10 bg-background-popup-header px-4">
        <DialogTitle class="text-base text-neutral-50">Chi tiết kèo</DialogTitle>
      </DialogHeader>
      <div class="bg-neutral-600">
        <div class="grid grid-cols-2 gap-x-3 p-4">
          <Button
            class="h-auto w-full rounded-lg border-white/10 bg-primary-400/7 py-2 text-base font-semibold leading-[22px] text-neutral-50"
            :class="{ 'bg-primary-400': activeTab === TabOddsEnum.FULlTIME }"
            @click="handleChangeTab(TabOddsEnum.FULlTIME)"
          >
            Kèo toàn trận
          </Button>
          <Button
            class="h-auto w-full rounded-lg border-white/10 bg-primary-400/7 py-2 text-base font-semibold leading-[22px] text-neutral-50"
            :class="{ 'bg-primary-400': activeTab === TabOddsEnum.HALFTIME }"
            @click="handleChangeTab(TabOddsEnum.HALFTIME)"
          >
            Kèo hiệp 1
          </Button>
        </div>
        <div class="px-4 py-3">
          <div
            v-for="(rates, key) in matchRate"
            :key="`row-${key}`"
            class="mb-2 grid grid-cols-3 gap-2 border-b border-white/10 pb-2"
          >
            <template v-for="(rate, rateIndex) in rates" :key="`rate-${rateIndex}`">
              <ScheduleMatchRate
                :is-highlighted="rate.ksports.favorite"
                class="grid-cols-1 bg-primary-400/5"
                @click="emit('playSport', matchDetail, SportProvidersEnum.KSPORTS)"
              >
                <ScheduleMatchOdds
                  :is-over-odds="rate.ksports.isOverOdds"
                  class="leading-5 text-white"
                  :odds="rate.ksports.rate"
                />
                <ScheduleMatchOdds class="leading-5 shadow-rateOdds" :odds="rate.ksports.odds" />
              </ScheduleMatchRate>
              <div class="self-center text-center text-sm text-neutral-50">{{ rate.name }}</div>
              <ScheduleMatchRate
                :is-highlighted="rate.ssports.favorite"
                class="grid-cols-1 bg-primary-400/5"
                @click="emit('playSport', matchDetail, SportProvidersEnum.SSPORTS)"
              >
                <ScheduleMatchOdds
                  :is-over-odds="rate.ssports.isOverOdds"
                  class="leading-5 text-white"
                  :odds="rate.ssports.rate"
                />
                <ScheduleMatchOdds class="leading-5 shadow-rateOdds" :odds="rate.ssports.odds" />
              </ScheduleMatchRate>
            </template>
          </div>
          <div class="grid grid-cols-3 gap-x-2 gap-y-1.5 pb-2">
            <template v-for="(rate, indexWin) in matchWinRates" :key="`win-${indexWin}`">
              <ScheduleMatchOdds
                class="bg-primary-400/5 py-1.5 leading-5 text-white shadow-rateOdds"
                :odds="rate.ksports"
                @click="emit('playSport', matchDetail, SportProvidersEnum.KSPORTS)"
              />
              <div class="self-center text-center text-sm text-neutral-50">{{ rate.name }}</div>
              <ScheduleMatchOdds
                class="bg-primary-400/5 py-1.5 leading-5 text-white shadow-rateOdds"
                :odds="rate.ssports"
                @click="emit('playSport', matchDetail, SportProvidersEnum.SSPORTS)"
              />
            </template>
          </div>
        </div>
        <div
          v-if="matchDetail.imatch_id && matchDetail.match_id"
          class="p-4 text-center text-sm font-normal text-primary-300 underline"
          @click="emit('viewMatchDetail', matchDetail)"
        >
          Soi kèo
        </div>
        <div class="grid grid-cols-2 gap-4 px-4 pb-4">
          <Button
            class="h-12 w-full rounded-lg text-base font-semibold text-neutral-50"
            @click="emit('playSport', matchDetail, SportProvidersEnum.KSPORTS)"
          >
            {{ LABEL.BUTTON_KSPORTS }}
          </Button>
          <Button
            variant="outline"
            :disabled="!matchInfo?.athena_ah && !matchInfo?.athena_over"
            class="h-12 w-full rounded-lg border-primary-400 text-base font-semibold text-primary-400"
            @click="emit('playSport', matchDetail, SportProvidersEnum.SSPORTS)"
          >
            {{ LABEL.BUTTON_SSPORTS }}
          </Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>

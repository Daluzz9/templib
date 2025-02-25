<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import type { PrimitiveProps } from "radix-vue";
import { LABEL, formatMatchListData } from "~/components/organisms/schedule-match/static";

type IProps = PrimitiveProps & {
  class?: HTMLAttributes["class"];
  leagueLogo: string;
  leagueName: string;
  matchList: IMatchDetailData[];
};

const props = withDefaults(defineProps<IProps>(), {});

const { playSport } = useSport();

const isBodyCollapsed = ref(false);
const expandedRowId = ref("");

const matchData = computed(() => {
  return formatMatchListData(props.matchList, expandedRowId.value);
});

const handleToggleBody = () => {
  isBodyCollapsed.value = !isBodyCollapsed.value;
};

const handleToggleRow = (rowId: string) => {
  expandedRowId.value = expandedRowId.value === rowId ? "" : rowId;
};

const handleViewMatchDetail = (matchDetail: IMatchDetailData) => {
  navigateTo({
    path: APP_PATH.MATCH_DETAIL,
    query: { imatchid: matchDetail.imatch_id, matchId: matchDetail.match_id },
  });
};

const handlePlaySport = (match: IMatchDetailData, sportProvider: SportProvidersEnum, allowAction: boolean) => {
  if (allowAction) {
    playSport({ match, sportProvider });
  }
};
</script>

<template>
  <ScheduleMatchTable
    :is-body-collapsed="isBodyCollapsed"
    :class="cn('w-fit grid-cols-[248px_repeat(2,_160px)_65px_repeat(2,_160px)_65px_122px] gap-x-5', props.class)"
  >
    <ScheduleMatchTableHeader class="sticky top-[206px] z-30 rounded-t-lg" @click="handleToggleBody">
      <ScheduleMatchTableRow class="py-2.5 text-center">
        <ScheduleMatchTableCell class="pl-4">
          <ScheduleMatchTeam
            :logo="leagueLogo"
            :name="leagueName"
            name-class="font-normal"
            width="28px"
            height="28px"
          />
        </ScheduleMatchTableCell>
        <ScheduleMatchTableCell>Kèo chấp TT</ScheduleMatchTableCell>
        <ScheduleMatchTableCell>Tài xỉu TT</ScheduleMatchTableCell>
        <ScheduleMatchTableCell>Thắng TT</ScheduleMatchTableCell>
        <ScheduleMatchTableCell>Kèo chấp H1</ScheduleMatchTableCell>
        <ScheduleMatchTableCell>Tài xỉu H1</ScheduleMatchTableCell>
        <ScheduleMatchTableCell>Thắng H1</ScheduleMatchTableCell>
        <ScheduleMatchTableCell class="pr-4">
          <SvgoArrow
            class="ml-auto -rotate-90 text-3xl text-neutral-50 transition group-data-[state=collapsed]/table:rotate-90"
          />
        </ScheduleMatchTableCell>
      </ScheduleMatchTableRow>
    </ScheduleMatchTableHeader>
    <ScheduleMatchTableBody class="rounded-b-lg">
      <ScheduleMatchTableRow
        v-for="matchDetail in matchData"
        :key="`row-${matchDetail.match_id}-${matchDetail.imatch_id}`"
        :row-id="`${matchDetail.match_id}-${matchDetail.imatch_id}`"
        :expanded-row-id="expandedRowId"
        @click="handleToggleRow"
      >
        <ScheduleMatchTableCell
          class="pl-4"
          :class="
            matchDetail.athena_match_id ? 'row-span-2 self-stretch group-data-[state=expanded]/row:row-span-3' : ''
          "
        >
          <div class="flex h-full gap-2">
            <div
              class="flex min-h-14 flex-col items-center justify-center self-start border-r border-solid border-white/10 pr-2"
            >
              <ScheduleMatchBets
                v-if="matchDetail.match_id && matchDetail.imatch_id"
                @click.stop="handleViewMatchDetail(matchDetail)"
              />
              <ScheduleMatchTime :time="matchDetail.text_time" />
            </div>
            <div class="flex flex-auto flex-col gap-2 border-r border-solid border-white/10 py-0.5 pr-2">
              <ScheduleMatchTeam :logo="matchDetail.teams[0]?.flag_thumbnail" :name="matchDetail.teams[0]?.name" />
              <ScheduleMatchTeam :logo="matchDetail.teams[1]?.flag_thumbnail" :name="matchDetail.teams[1]?.name" />
            </div>
          </div>
        </ScheduleMatchTableCell>
        <ScheduleMatchTableCell
          v-for="(rate, rateIndex) in matchDetail.rates"
          :key="`cell-${rateIndex}-${matchDetail.match_id}-${matchDetail.imatch_id}`"
        >
          <ScheduleMatchRate
            :is-highlighted="rate.isHighlighted"
            :is-expanded="rate.isExpanded"
            :class="
              rate.isSingleOdds
                ? 'md:grid-cols- grid-cols-1 gap-0 py-0 hover:bg-white/0 hover:outline-white/0 md:gap-0'
                : ''
            "
          >
            <template
              v-for="(odds, oddsIndex) in rate.odds"
              :key="`odds-${oddsIndex}-${matchDetail.match_id}-${matchDetail.imatch_id}`"
            >
              <ScheduleMatchOdds
                v-if="rate.isExpanded || (!odds.isDefaultHidden && !odds.isOverOdds)"
                :class="{
                  'text-white': rate.isSingleOdds || odds.isRateValue || odds.isOverOdds,
                  'mx-auto': rate.isSingleOdds,
                  'w-fit': rate.isSingleOdds,
                  '-order-1': rate.isExpanded && !rate.isSingleOdds && odds.isRateValue,
                  'order-1': rate.isExpanded && rate.isSingleOdds && odds.isRateValue,
                  'leading-5 last:-col-end-1': rate.isExpanded,
                }"
                :is-over-odds="odds.isOverOdds"
                :is-expanded="rate.isExpanded"
                :odds="odds.value"
                @click="
                  handlePlaySport(
                    matchDetail,
                    SportProvidersEnum.KSPORTS,
                    rate.isExpanded && !odds.isOverOdds && odds.value,
                  )
                "
              />
            </template>
          </ScheduleMatchRate>
        </ScheduleMatchTableCell>
        <ScheduleMatchTableCell>
          <Button
            variant="default"
            class="h-auto rounded-lg px-2.5 py-1 leading-4"
            @click.stop="handlePlaySport(matchDetail, SportProvidersEnum.KSPORTS, true)"
          >
            {{ LABEL.BUTTON_KSPORTS }}
          </Button>
        </ScheduleMatchTableCell>
        <template v-if="matchDetail.athena_match_id">
          <ScheduleMatchTableLine />
          <ScheduleMatchTableCell
            v-for="(rate, rateIndex) in matchDetail.athenaRates"
            :key="`cell-${rateIndex}-${matchDetail.match_id}-${matchDetail.imatch_id}`"
          >
            <ScheduleMatchRate
              :is-highlighted="rate.isHighlighted"
              :is-expanded="rate.isExpanded"
              :class="
                rate.isSingleOdds
                  ? 'md:grid-cols- grid-cols-1 gap-0 py-0 hover:bg-white/0 hover:outline-white/0 md:gap-0'
                  : ''
              "
            >
              <template
                v-for="(odds, oddsIndex) in rate.odds"
                :key="`odds-${oddsIndex}-${matchDetail.match_id}-${matchDetail.imatch_id}`"
              >
                <ScheduleMatchOdds
                  v-if="rate.isExpanded || (!odds.isDefaultHidden && !odds.isOverOdds)"
                  :class="{
                    'text-white': rate.isSingleOdds || odds.isRateValue || odds.isOverOdds,
                    'mx-auto': rate.isSingleOdds,
                    'w-fit': rate.isSingleOdds,
                    '-order-1': rate.isExpanded && !rate.isSingleOdds && odds.isRateValue,
                    'order-1': rate.isExpanded && rate.isSingleOdds && odds.isRateValue,
                    'leading-5 last:-col-end-1': rate.isExpanded,
                  }"
                  :is-over-odds="odds.isOverOdds"
                  :is-expanded="rate.isExpanded"
                  :odds="odds.value"
                  @click="
                    handlePlaySport(
                      matchDetail,
                      SportProvidersEnum.SSPORTS,
                      rate.isExpanded && !odds.isOverOdds && odds.value,
                    )
                  "
                />
              </template>
            </ScheduleMatchRate>
          </ScheduleMatchTableCell>
          <ScheduleMatchTableCell class="pr-4">
            <Button
              variant="outline"
              class="h-auto rounded-lg border-primary-400 px-2.5 py-1 leading-4 text-primary-400"
              @click.stop="handlePlaySport(matchDetail, SportProvidersEnum.SSPORTS, true)"
            >
              {{ LABEL.BUTTON_SSPORTS }}
            </Button>
          </ScheduleMatchTableCell>
        </template>
      </ScheduleMatchTableRow>
    </ScheduleMatchTableBody>
  </ScheduleMatchTable>
</template>

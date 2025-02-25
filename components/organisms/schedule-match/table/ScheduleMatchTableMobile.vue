<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import type { PrimitiveProps } from "radix-vue";
import { LABEL } from "~/components/organisms/schedule-match/static";

type IProps = PrimitiveProps & {
  class?: HTMLAttributes["class"];
  leagueLogo: string;
  leagueName: string;
  matchList: IMatchDetailData[];
};

const props = withDefaults(defineProps<IProps>(), {});

const { playSport } = useSport();

const isBodyCollapsed = ref(false);

const handleToggleBody = () => {
  isBodyCollapsed.value = !isBodyCollapsed.value;
};

const handleViewMatchDetail = (matchDetail: IMatchDetailData) => {
  navigateTo({
    path: APP_PATH.MATCH_DETAIL,
    query: { imatchid: matchDetail.imatch_id, matchId: matchDetail.match_id },
  });
};

const handlePlaySport = (match: IMatchDetailData, sportProvider: SportProvidersEnum, allowAction = true) => {
  if (allowAction) {
    playSport({ match, sportProvider });
  }
};
</script>

<template>
  <ScheduleMatchTable
    :class="cn('grid-cols-[repeat(3,_auto)] gap-x-2', props.class)"
    :is-body-collapsed="isBodyCollapsed"
  >
    <ScheduleMatchTableHeader class="bg-[#34393D]" @click="handleToggleBody">
      <ScheduleMatchTableRow class="px-4 py-2">
        <ScheduleMatchTableCell class="col-span-2">
          <ScheduleMatchTeam :logo="leagueLogo" :name="leagueName" name-class="font-normal text-base" />
        </ScheduleMatchTableCell>
        <ScheduleMatchTableCell>
          <SvgoArrow
            class="ml-auto -rotate-90 text-3xl text-neutral-50 transition group-data-[state=collapsed]/table:rotate-90"
          />
        </ScheduleMatchTableCell>
      </ScheduleMatchTableRow>
    </ScheduleMatchTableHeader>
    <ScheduleMatchTableBody
      v-for="matchDetail in matchList"
      :key="`${matchDetail.match_id}-${matchDetail.imatch_id}`"
      :row-id="`${matchDetail.match_id}-${matchDetail.imatch_id}`"
      class="px-4 odd:bg-[#213F7B]/5 even:bg-neutral-750"
    >
      <DialogScheduleMatchDetail
        :match-detail="matchDetail"
        @view-match-detail="handleViewMatchDetail"
        @play-sport="handlePlaySport"
      >
        <template #trigger>
          <ScheduleMatchTableRow class="grid-cols-[38px_auto_50px] border-0">
            <ScheduleMatchTableCell class="self-start">
              <ScheduleMatchTime
                :show-icon="!!(matchDetail.match_id && matchDetail.imatch_id)"
                :time="matchDetail.text_time"
              />
            </ScheduleMatchTableCell>
            <ScheduleMatchTableCell class="grid gap-y-1">
              <ScheduleMatchTeam
                :logo="matchDetail.teams[0]?.flag_thumbnail"
                :name="matchDetail.teams[0]?.name"
                name-class="font-normal"
                image-class="w-6 h-6 p-1 bg-neutral-600"
                width="16px"
                height="16px"
                :is-handicap="!!(matchDetail.aTeam?.rate && matchDetail.aTeam?.rate > 0)"
              />
              <ScheduleMatchTeam
                :logo="matchDetail.teams[1]?.flag_thumbnail"
                :name="matchDetail.teams[1]?.name"
                name-class="font-normal"
                image-class="w-6 h-6 p-1 bg-neutral-600"
                width="16px"
                height="16px"
                :is-handicap="!!(matchDetail.hTeam?.rate && matchDetail.hTeam?.rate > 0)"
              />
            </ScheduleMatchTableCell>
            <ScheduleMatchTableCell>
              <ScheduleMatchBets
                v-if="matchDetail.match_id && matchDetail.imatch_id"
                class="flex flex-col items-end gap-y-1"
                @click.stop="handleViewMatchDetail(matchDetail)"
              >
                <div class="font-nunito text-sm font-normal text-neutral-200">Soi kèo</div>
              </ScheduleMatchBets>
            </ScheduleMatchTableCell>
          </ScheduleMatchTableRow>
        </template>
      </DialogScheduleMatchDetail>
      <DialogScheduleMatchDetail
        :match-detail="matchDetail"
        @view-match-detail="handleViewMatchDetail"
        @play-sport="handlePlaySport"
      >
        <template #trigger>
          <ScheduleMatchTableRow class="grid-cols-[120px_auto_120px] border-0 md:grid-cols-[158px_auto_158px]">
            <ScheduleMatchTableCell>
              <ScheduleMatchRate :is-highlighted="matchDetail.ahFT?.favorite">
                <ScheduleMatchOdds :odds="matchDetail.ahFT?.hTeam?.odds" />
                <ScheduleMatchOdds class="text-white" :odds="matchDetail.ahFT?.hTeam?.rate" />
                <ScheduleMatchOdds :odds="matchDetail.ahFT?.aTeam?.odds" />
              </ScheduleMatchRate>
            </ScheduleMatchTableCell>
            <ScheduleMatchTableCell class="text-center text-sm text-neutral-50">Chấp</ScheduleMatchTableCell>
            <ScheduleMatchTableCell>
              <ScheduleMatchRate :is-highlighted="matchDetail.athena_ahFT?.favorite">
                <ScheduleMatchOdds :odds="matchDetail.athena_ahFT?.hTeam?.odds" />
                <ScheduleMatchOdds class="text-white" :odds="matchDetail.athena_ahFT?.hTeam?.rate" />
                <ScheduleMatchOdds :odds="matchDetail.athena_ahFT?.aTeam?.odds" />
              </ScheduleMatchRate>
            </ScheduleMatchTableCell>
            <ScheduleMatchTableCell>
              <ScheduleMatchRate :is-highlighted="matchDetail.overFT?.favorite">
                <ScheduleMatchOdds :odds="matchDetail.overFT?.hTeam?.odds" />
                <ScheduleMatchOdds class="text-white" :odds="matchDetail.overFT?.hTeam?.rate" />
                <ScheduleMatchOdds :odds="matchDetail.overFT?.aTeam?.odds" />
              </ScheduleMatchRate>
            </ScheduleMatchTableCell>
            <ScheduleMatchTableCell class="text-center text-sm text-neutral-50">Tài xỉu</ScheduleMatchTableCell>
            <ScheduleMatchTableCell>
              <ScheduleMatchRate :is-highlighted="matchDetail.athena_overFT?.favorite">
                <ScheduleMatchOdds :odds="matchDetail.athena_overFT?.hTeam?.odds" />
                <ScheduleMatchOdds class="text-white" :odds="matchDetail.athena_overFT?.hTeam?.rate" />
                <ScheduleMatchOdds :odds="matchDetail.athena_overFT?.aTeam?.odds" />
              </ScheduleMatchRate>
            </ScheduleMatchTableCell>
          </ScheduleMatchTableRow>
        </template>
      </DialogScheduleMatchDetail>
      <ScheduleMatchTableRow class="grid-cols-2 border-0 pb-3">
        <ScheduleMatchTableCell>
          <Button
            variant="default"
            class="h-auto w-full rounded-lg py-1 font-normal"
            @click.stop="handlePlaySport(matchDetail, SportProvidersEnum.KSPORTS)"
          >
            {{ LABEL.BUTTON_KSPORTS }}
          </Button>
        </ScheduleMatchTableCell>
        <ScheduleMatchTableCell>
          <Button
            variant="outline"
            :disabled="!matchDetail.athena_overFT"
            class="h-auto w-full rounded-lg border-primary-400 py-1 font-normal text-primary-400"
            @click.stop="handlePlaySport(matchDetail, SportProvidersEnum.SSPORTS)"
          >
            {{ LABEL.BUTTON_SSPORTS }}
          </Button>
        </ScheduleMatchTableCell>
      </ScheduleMatchTableRow>
    </ScheduleMatchTableBody>
  </ScheduleMatchTable>
</template>

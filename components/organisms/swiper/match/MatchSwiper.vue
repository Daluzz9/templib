<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";
import { Primitive, type PrimitiveProps } from "radix-vue";
import get from "lodash/get";

type IProps = PrimitiveProps & {
  class?: HTMLAttributes["class"];
  title?: string;
  matchList: IMatchDetailData[];
};

const props = withDefaults(defineProps<IProps>(), {
  as: "div",
});

const { playSport } = useSport();

const swiperOptions = {
  loop: false,
  grabCursor: true,
  centeredSlides: false,
  pagination: false,
  slidesPerView: 2.38,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
};

const handleBet = (sportProvider: SportProvidersEnum, match: IMatchDetailData) => {
  playSport({ match, sportProvider });
};
</script>

<template>
  <Primitive :class="cn('ml-auto w-full lg:w-[850px]', props.class)">
    <Swiper v-bind="swiperOptions" :modules="[Navigation]">
      <template #container-start>
        <div class="mb-3 flex justify-between">
          <h2 v-if="!!title" class="text-bold flex-auto font-nunito text-2xl text-white">{{ title }}</h2>
          <div class="flex items-center gap-2">
            <button
              class="swiper-button-prev group h-7 w-7 rounded-md bg-[#34393D] text-center disabled:cursor-not-allowed disabled:bg-[#303438]"
            >
              <SvgoArrow class="m-auto rotate-180 text-xl text-white group-disabled:text-[#42474D]" />
            </button>
            <button
              class="swiper-button-next group h-7 w-7 rounded-md bg-[#34393D] text-center disabled:cursor-not-allowed disabled:bg-[#303438]"
            >
              <SvgoArrow class="m-auto text-xl text-white group-disabled:text-[#42474D]" />
            </button>
          </div>
        </div>
      </template>
      <SwiperSlide v-for="match in matchList" :key="match.imatch_id" class="swiper-slide mr-4 max-w-fit">
        <MatchDetail>
          <MatchDetailTitle>{{ match.league_name }}</MatchDetailTitle>
          <MatchDetailInfo
            :time="match.text_time"
            :home-team="{
              logo: get(match, 'teams[0].flag_thumbnail'),
              name: get(match, 'teams[0].name'),
            }"
            :away-team="{
              logo: get(match, 'teams[1].flag_thumbnail'),
              name: get(match, 'teams[1].name'),
            }"
          />
          <MatchDetailRate
            button-text="Cược K"
            :handicap="{
              homeOdds: get(match, 'ahFT.hTeam.odds', 0),
              rate: get(match, 'ahFT.hTeam.rate', 0),
              awayOdds: get(match, 'ahFT.aTeam.odds', 0),
            }"
            :over="{
              homeOdds: get(match, 'ahFT.hTeam.odds', 0),
              rate: get(match, 'ahFT.hTeam.rate', 0),
              awayOdds: get(match, 'ahFT.aTeam.odds', 0),
            }"
            @click="handleBet(SportProvidersEnum.KSPORTS, match)"
          />
          <MatchDetailRate
            class="mt-1"
            button-text="Cược A"
            button-variant="secondary"
            :handicap="{
              homeOdds: get(match, 'athena_ahFT.hTeam.odds', 0),
              rate: get(match, 'athena_ahFT.hTeam.rate', 0),
              awayOdds: get(match, 'athena_ahFT.aTeam.odds', 0),
            }"
            :over="{
              homeOdds: get(match, 'athena_overFT.hTeam.odds', 0),
              rate: get(match, 'athena_overFT.hTeam.rate', 0),
              awayOdds: get(match, 'athena_overFT.aTeam.odds', 0),
            }"
            @click="handleBet(SportProvidersEnum.SSPORTS, match)"
          />
        </MatchDetail>
      </SwiperSlide>
    </Swiper>
  </Primitive>
</template>

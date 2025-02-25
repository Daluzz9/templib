<script setup lang="ts">
import type { PrimitiveProps } from "radix-vue";

type IProps = PrimitiveProps & {
  days: IDayItem[];
  daySelected: IDayItem;
  leagues: ILeague[];
  leagueSelected: ILeague;
};

const props = withDefaults(defineProps<IProps>(), {});

const emit = defineEmits<{
  (e: "onSelectLeague", league: ILeague): void;
  (e: "onSelectDay", dayItem: IDayItem): void;
}>();

const searchLeague = ref<string>("");

const leaguesDisplay = computed<ILeague[]>(() => {
  if (!searchLeague.value) {
    return props.leagues;
  }
  return props.leagues.filter((item) => item.name.toLowerCase().includes(searchLeague.value.toLowerCase()));
});
</script>

<template>
  <div class="mt-4 flex items-center justify-between">
    <DropdownMenu>
      <DropdownMenuTrigger>
        <DropdownMenuToggle
          :key="leagueSelected.id"
          class="w-[250px] rounded-lg bg-white/5 py-2 pl-2.5 outline outline-neutral-200/12 group-data-[state=open]:bg-primary-400/5 group-data-[state=open]:outline-primary-300"
        >
          <Image
            class="flex-none rounded-full"
            width="32px"
            height="32px"
            placeholder-src="/sport/sport-schedule/logo-league-default.svg"
            :src="leagueSelected.id === 'all' ? '/sport/sport-schedule/icon-setting.svg' : leagueSelected.logo"
            :alt="leagueSelected.name"
          />
          <span class="ml-2 mr-auto line-clamp-1 font-normal text-primary">{{ leagueSelected.name }}</span>
        </DropdownMenuToggle>
      </DropdownMenuTrigger>
      <DropdownMenuContent class="max-h-[348px] rounded-sm border border-white/10 bg-neutral-600 p-0">
        <DropdownMenuSearch v-model="searchLeague" icon-position="right" placeholder="Tìm kiếm giải đấu" />
        <DropdownMenuSeparator class="m-0 bg-white/10" />
        <DropdownMenuRadioGroup :model-value="leagueSelected.id">
          <div
            v-if="leaguesDisplay.length === 0"
            class="flex h-48 items-center justify-center text-sm font-normal text-neutral-300"
          >
            Không tìm thấy giải đấu nào !
          </div>
          <template v-else>
            <DropdownMenuRadioItem
              v-for="league in leaguesDisplay"
              :key="league.id"
              :value="league.id"
              class="border-l-2 border-transparent py-1.5 pl-2 pr-3 hover:bg-white/5 data-[state=checked]:border-primary-300 data-[state=checked]:bg-white/5"
              @click="emit('onSelectLeague', league)"
            >
              <Image
                class="flex-none rounded-full"
                width="32px"
                height="32px"
                placeholder-src="/sport/sport-schedule/logo-league-default.svg"
                :src="league.logo"
                :alt="league.name"
              />
              <span class="ml-2 mr-auto line-clamp-1 font-normal text-primary">{{ league.name }}</span>
            </DropdownMenuRadioItem>
          </template>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
    <div class="flex gap-x-2">
      <div
        v-for="item in days"
        :key="item.longDay"
        class="w-24 cursor-pointer rounded-md border border-white/12 px-3 py-2 text-center font-nunito text-base font-semibold text-primary hover:bg-primary-400"
        :class="item.longDay === daySelected.longDay ? 'bg-primary-400' : 'bg-primary-400/7'"
        @click="emit('onSelectDay', item)"
      >
        <div>{{ item.title }}</div>
        <div>({{ item.shortDay }})</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import get from "lodash/get";

const authDialogController = useDialog(DialogTypeEnum.LOGIN);

const { fetchGames: fetchHotGames } = useFetchGames({
  type: GameTypeEnum.GAME,
  limit: 12,
  sortBy: GameSortByEnum.HOT_GAME,
});

const { fetchGames: fetchLiveCasinoGames } = useFetchGames({ type: GameTypeEnum.CASINO, limit: 8 });
const { fetchContacts, contacts } = useContact();
const { fetch: fetchHotMatchList, hotMatchList } = useHotMatch();
const { fetchBanners, banners, handleSelect } = useBanner();

const { data } = await useApi("getHomeData", async () => {
  return Promise.all([fetchHotGames(), fetchLiveCasinoGames(), fetchContacts(), fetchHotMatchList(), fetchBanners()]);
});
</script>

<template>
  <section>
    <BannerSwiper
      :banners="banners"
      @select="(banner: IBanner) => handleSelect({ banner, openLoginDialogFn: authDialogController.openDialog })"
    />

    <div class="container py-6">
      <FeaturedAliasesDesktop />
    </div>

    <div class="bg-[url('/images/background/background1.webp')] bg-cover bg-center bg-no-repeat py-6">
      <div class="container">
        <LiveCasinoDesktop v-if="get(data, '[1].items.length')" :games="get(data, '[1].items', [])" />
      </div>
    </div>

    <div class="bg-[url('/images/background/background2.webp')] bg-cover bg-right bg-no-repeat py-8">
      <ListWrapper title="Trò Chơi Phổ Biến" class="container">
        <div v-if="get(data, '[0].items.length')" class="grid grid-cols-6 gap-4">
          <GameThumb v-for="game of get(data, '[0].items')" :key="game.img" :game="game" />
        </div>
      </ListWrapper>
    </div>

    <div class="container pb-10 pt-2">
      <Widget :contacts="contacts" />
    </div>

    <div
      v-if="hotMatchList.length > 0"
      class="h-[270px] bg-[url('/images/background/match-detail.webp')] bg-cover bg-center bg-no-repeat"
    >
      <div class="container relative">
        <div class="absolute left-0 hidden lg:block">
          <Image src="/sport/match-detail.webp" alt="match-detail" />
        </div>
        <MatchSwiper :match-list="hotMatchList" title="Trận Đấu Nổi Bật" class="relative z-20 py-6" />
      </div>
    </div>
  </section>

  <AuthDialog v-if="authDialogController.isOpen.value" :controller="authDialogController" />
</template>

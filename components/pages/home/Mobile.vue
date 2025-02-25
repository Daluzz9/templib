<script lang="ts" setup>
import get from "lodash/get";

const authDialogController = useDialog(DialogTypeEnum.LOGIN);

const { fetchGames: fetchPopularGames } = useFetchGames({
  type: GameTypeEnum.GAME,
  limit: 6,
  sortBy: GameSortByEnum.HOT_GAME,
});

const { fetchGames: fetchLiveCasinoGames } = useFetchGames({ type: GameTypeEnum.CASINO, limit: 6 });
const { fetchContacts, contacts } = useContact();
const { fetchBanners, banners, handleSelect } = useBanner();

const { data } = await useApi("getHomeData", async () => {
  return Promise.all([fetchPopularGames(), fetchLiveCasinoGames(), fetchContacts(), fetchBanners()]);
});
</script>

<template>
  <section class="flex flex-col gap-3 pb-3">
    <BannerSwiper
      :banners="banners"
      @select="(banner: IBanner) => handleSelect({ banner, openLoginDialogFn: authDialogController.openDialog })"
    />
    <div class="container">
      <FeaturedAliasesMobile />
    </div>

    <div class="container">
      <LiveCasinoMobile v-if="get(data, '[1].items.length')" :games="get(data, '[1].items', [])" />
    </div>

    <ListWrapper title="Trò Chơi Phổ Biến" class="container">
      <div v-if="get(data, '[0].items.length')" class="grid grid-cols-3 gap-2">
        <GameThumb v-for="game of get(data, '[0].items')" :key="game.img" :game="game" />
      </div>
    </ListWrapper>

    <FooterMobile :contacts="contacts" />
  </section>

  <AuthDialog v-if="authDialogController.isOpen.value" :controller="authDialogController" />
</template>

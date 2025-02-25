<script lang="ts" setup>
type IProps = {
  aliases: IGameAlias[];
};

const props = defineProps<IProps>();

const route = useRoute();
const { $device } = useNuxtApp();
const { scrollContainerRef, scrollTo } = useScrollTo("horizontal");
const SCROLL_DELAY = 200; //ms

const selectedAlias = computed<IGameAlias | undefined>(() => {
  const value = (route.params.type as GameAliasEnum) || GameAliasEnum.ALL;
  return props.aliases.find((el) => el.alias === value);
});

const handleSelectAlias = async (index: number, gameAlias: IGameAlias) => {
  const gameTypePath = route.path.startsWith(APP_PATH.GAME) ? APP_PATH.GAME : APP_PATH.CASINO;
  if (selectedAlias.value?.alias === gameAlias?.alias) return;
  const gameAliasPath = gameAlias.alias === GameAliasEnum.ALL ? "" : `/${gameAlias.alias}`;
  await navigateTo({
    path: `${gameTypePath}${gameAliasPath}`,
    query: {
      ...route.query,
      provider: undefined,
    },
  });
};

watch(
  selectedAlias,
  async (curAlias) => {
    const index = props.aliases.findIndex((el) => el.alias === curAlias?.alias);
    if (index >= 0) {
      setTimeout(() => {
        scrollTo(index);
      }, SCROLL_DELAY);
    }
  },
  {
    immediate: true,
  },
);
</script>

<template>
  <div
    ref="scrollContainerRef"
    class="flex gap-2"
    :class="[$device.isMobileOrTablet ? 'no-scrollbar flex-nowrap overflow-x-scroll' : 'flex-wrap rounded-2xl']"
  >
    <button
      v-for="(gameAlias, index) in aliases"
      :key="gameAlias.alias"
      class="relative flex min-h-9 min-w-11 flex-shrink-0 flex-col items-center justify-center overflow-hidden rounded-lg"
      :class="
        cn([
          $device.isMobileOrTablet ? 'px-5 py-1 text-xs text-neutral-200' : 'flex-grow gap-1 px-3 py-2 text-sm',
          selectedAlias?.alias === gameAlias.alias
            ? `active bg-[url('/images/blue-active-button.webp')] bg-cover bg-center bg-no-repeat text-white`
            : 'bg-neutral-700',
        ])
      "
      :variant="selectedAlias?.alias === gameAlias.alias ? 'default' : 'dark'"
      @click="handleSelectAlias(index, gameAlias)"
    >
      <Image
        v-if="$device.isMobileOrTablet && gameAlias.icon"
        :src="gameAlias.icon"
        :alt="gameAlias.alias"
        width="24px"
        height="24px"
        img-class="object-container"
        :show-placeholder="false"
        show-spinner
      />
      <p>
        {{ gameAlias.display_name }}
      </p>
    </button>
  </div>
</template>

<style scoped>
.active:deep(img) {
  filter: brightness(0) invert(1);
}
</style>

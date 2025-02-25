<script setup lang="ts">
const props = defineProps<{
  dataLiveStream: ILiveStream;
}>();
const authDialogController = useDialog(DialogTypeEnum.LOGIN);
const blockGameDialogController = useDialog();
const addDisplayNameDialogController = useDialog();

const {
  isMuted,
  viewerNumber,
  liveStreamError,
  liveStreamSuccessMessage,
  liveStreamPauseMessage,
  isLoading,
  isSoundIconVisible,
  toggleMute,
  handleReplay,
  player,
} = useLiveStream(props.dataLiveStream);

const { playGameFromLiveStream } = usePlayLiveStream();
const openCancelPromotionDialog = () => {};

const handlePlayGame = (livestreamInfo?: ILiveStream) => {
  playGameFromLiveStream({
    livestreamInfo,
    openLoginDialogFn: authDialogController.openDialog,
    openBlockGameDialogFn: blockGameDialogController.openDialog,
    openAddDisplayNameDialogFn: addDisplayNameDialogController.openDialog,
  });
};
watch([liveStreamError, liveStreamSuccessMessage, liveStreamPauseMessage], () => {
  // TODO shot toaster message
});

const { getJackpotByAliasId } = useJackpot();
const jackpot = computed(() => {
  return getJackpotByAliasId(props.dataLiveStream.id_jackpot);
});
</script>

<template>
  <ClientOnly>
    <div class="relative aspect-[16/9] w-full flex-shrink-0 overflow-hidden rounded-xl">
      <div :id="'live-' + dataLiveStream.streamName" class="relative h-full w-full">
        <div v-if="player" class="h-full w-full">
          <div
            v-if="isSoundIconVisible"
            class="absolute left-3 top-3 z-1100 flex h-7 w-7 items-center justify-center rounded-full bg-black/60"
          >
            <Image
              :src="isMuted ? '/volume.webp' : '/muted-volume.webp'"
              :alt="isMuted ? 'icon sound on' : 'icon muted'"
              height="18px"
              width="18px"
              class="cursor-pointer"
              @click="toggleMute"
            />
          </div>

          <div class="absolute bottom-3 left-3 z-1000 space-y-1">
            <div class="text-[16px] font-bold">{{ dataLiveStream.name }}</div>
            <JackpotWrapper v-if="jackpot">
              <AnimatedNumber :value="jackpot" :init-number="0" />
            </JackpotWrapper>
          </div>

          <div
            class="absolute right-3 top-3 z-1000 flex h-[25px] items-center rounded-full bg-black/80 px-2 py-0.5 text-xs font-bold text-white"
          >
            <Image src="livestream/live-dot.webp" alt="icon dot" height="14px" width="14px" />
            <div class="px-1">LIVE</div>
            <!-- FRODO: Tobe remove -->
            <Image src="vertical-line.webp" height="8px" class="px-1" alt="vertical line" />

            <div class="flex items-center">
              <Image src="group.webp" alt="icon group" height="14px" width="14px" />
              <div class="ml-1">{{ viewerNumber }}</div>
            </div>
          </div>

          <!-- Play Button -->
          <div class="absolute bottom-3 right-3 z-1100">
            <Button
              variant="secondary"
              class="h-9 w-[100px] rounded-lg px-2 py-2 text-[16px] font-bold"
              @click="handlePlayGame(dataLiveStream)"
              >Chơi Ngay</Button
            >
          </div>

          <div
            v-if="liveStreamError && !isLoading"
            class="absolute inset-0 z-1000 flex cursor-pointer items-center justify-center"
            @click="handleReplay"
          >
            <Image src="play.svg" alt="icon play" height="48px" width="48px" />
          </div>

          <!-- Pause Area -->
          <div v-else class="absolute inset-0 z-1000" @click="handlePlayGame(dataLiveStream)" />
        </div>

        <!-- Default Thumbnail -->
        <div v-else class="z-10 h-full w-full">
          <Image
            :src="dataLiveStream.defaultBackground"
            :alt="dataLiveStream.name"
            class="h-full w-full rounded-xl"
            height="100%"
            loading="eager"
          />
        </div>

        <div v-if="isLoading" class="absolute inset-0 z-1000 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      </div>
    </div>

    <AuthDialog
      v-if="authDialogController.isOpen.value"
      :controller="authDialogController"
      @login="handlePlayGame()"
      @register="handlePlayGame()"
    />

    <DialogBlockGame
      v-if="blockGameDialogController.isOpen.value"
      :controller="blockGameDialogController"
      @cancel-promotion="openCancelPromotionDialog"
    />

    <AddDisplayNameDialog
      v-if="addDisplayNameDialogController.isOpen.value"
      :controller="addDisplayNameDialogController"
      @succeed="handlePlayGame"
    />
  </ClientOnly>
</template>

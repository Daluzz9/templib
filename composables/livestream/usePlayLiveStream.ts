export const usePlayLiveStream = () => {
  const { $gameService } = useNuxtApp();

  const route = useRoute();
  const { currentUser, isLoggedIn, isChangeDisplayNameRequired } = useCurrentUser();
  const { createToast } = useToast();
  const selectedLiveStream = useState<ILiveStream>("selected-live-stream");
  const isTrialPlay = ref<boolean>();

  const playGameFromLiveStream = async (options: {
    livestreamInfo?: ILiveStream;
    isTrial?: boolean;
    openLoginDialogFn: () => void;
    openBlockGameDialogFn: () => void;
    openAddDisplayNameDialogFn: () => void;
  }) => {
    try {
      if (!options?.livestreamInfo && !selectedLiveStream) return;

      if (options.livestreamInfo) {
        isTrialPlay.value = options.isTrial;
        selectedLiveStream.value = options.livestreamInfo;
      }

      if (!isLoggedIn.value) {
        options.openLoginDialogFn();
        return;
      }

      if (!validateLiveStreamPromotion()) {
        options.openBlockGameDialogFn();
        return;
      }

      if (isChangeDisplayNameRequired.value) {
        options.openAddDisplayNameDialogFn();
        return;
      }

      // Fetch live stream URL
      const liveStreamPlay = await getLiveStreamGamePlay();
      // Open live stream
      openInNewTab(liveStreamPlay?.url);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_e: unknown) {
      createToast({
        variant: "destructive",
        description: "Không thể mở game từ live stream",
      });
    }
  };

  const validateLiveStreamPromotion = (): boolean => {
    if (!currentUser.value || !selectedLiveStream.value) return false;
    const isBlockedLiveStream =
      Number(currentUser.value.package_id) > 1 && //package_id can be false
      selectedLiveStream.value.deny_info &&
      selectedLiveStream.value.deny_info === IGameDenyInfoEnum.WELCOME;
    return !isBlockedLiveStream;
  };

  const getLiveStreamGamePlay = async (): Promise<IGamePlay | undefined> => {
    if (!selectedLiveStream.value) return;

    return $gameService.getGamePlay({
      gameType: selectedLiveStream.value.game_type,
      isTrial: isTrialPlay.value,
      partnerGameId: selectedLiveStream.value.partner_game_id,
      partnerProvider: selectedLiveStream.value.partner,
      route: route.fullPath,
    });
  };

  return {
    playGameFromLiveStream,
  };
};

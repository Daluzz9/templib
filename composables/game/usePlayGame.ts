export const usePlayGame = () => {
  const { $gameService } = useNuxtApp();

  const route = useRoute();
  const { createToast } = useToast();
  const selectedGame = ref<IGame>();
  const isTrialPlay = ref<boolean>();
  const { currentUser, isLoggedIn, isChangeDisplayNameRequired } = useCurrentUser();

  const playGame = async (options: {
    game?: IGame;
    isTrial?: boolean;
    openLoginDialogFn: () => void;
    openBlockGameDialogFn: () => void;
    openAddDisplayNameDialogFn: () => void;
  }) => {
    try {
      if (!options?.game && !selectedGame) return;

      if (options.game) saveSelectedGame(options.game, options.isTrial);

      if (!isLoggedIn.value) {
        options.openLoginDialogFn();
        return false;
      }

      if (!validateGamePromotion()) {
        options.openBlockGameDialogFn();
        return false;
      }
      if (isChangeDisplayNameRequired.value) {
        options.openAddDisplayNameDialogFn();
        return false;
      }

      // Fetch game url
      const gamePlay = await getGamePlay();
      // Open game
      openInNewTab(gamePlay?.url);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e: unknown) {
      createToast({
        variant: "destructive",
        description: "Không thể mở game",
      });
    }
  };

  const saveSelectedGame = (item: IGame, isTrial?: boolean): void => {
    isTrialPlay.value = isTrial;
    selectedGame.value = item;
  };

  const validateGamePromotion = (): boolean => {
    if (!currentUser.value || !selectedGame.value) return false;
    const isBlockedGame =
      Number(currentUser.value.package_id) > 1 &&
      selectedGame.value.deny_info &&
      selectedGame.value.deny_info === IGameDenyInfoEnum.WELCOME;

    return !isBlockedGame;
  };

  const getGamePlay = async (): Promise<IGamePlay | undefined> => {
    if (!selectedGame.value) return;

    const { type, partner_game_id, partner_provider, table_id } = selectedGame.value;

    const commonParams: Partial<IFetchGamePlayOptions> = {
      gameType: type,
      partnerGameId: partner_game_id,
      provider: partner_provider,
      isTrial: isTrialPlay.value,
    };

    if (type === GameTypeEnum.GAME) {
      return $gameService.getGamePlay({
        ...commonParams,
        route: route.fullPath,
      } as IFetchGamePlayOptions);
    } else {
      return $gameService.getGamePlay({
        ...commonParams,
        tableId: table_id,
        depositPath: APP_PATH.DEPOSIT_BANK,
      } as IFetchGamePlayOptions);
    }
  };

  return {
    playGame,
  };
};

export const useUserRank = () => {
  const { $userService } = useNuxtApp();
  const { isLoggedIn } = useCurrentUser();
  const userRank = useState<IUserRankData["level"] | undefined>("user-rank");

  const {
    status,
    error,
    refresh: refreshUserRank,
  } = useApi(
    "getUserRank",
    async () => {
      if (isLoggedIn.value && userRank.value === undefined) {
        userRank.value = await $userService.getUserRank();
      } else {
        userRank.value = undefined;
      }

      return {};
    },
    {
      server: false,
      cache: false,
    },
  );

  return {
    userRank,
    status,
    error,
    refreshUserRank,
  };
};

export const useCurrentUser = () => {
  const currentUser = useState<IUserInfo | undefined>(undefined);

  const isLoggedIn = computed<boolean>(() => !!currentUser.value);

  const isChangeDisplayNameRequired = computed<boolean>(
    () => isLoggedIn.value && currentUser.value?.username === currentUser.value?.fullname,
  );

  return { currentUser, isLoggedIn, isChangeDisplayNameRequired };
};

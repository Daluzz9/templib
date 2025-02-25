export default defineNuxtRouteMiddleware((_to, _from) => {
  const { isLoggedIn } = useCurrentUser();
  const user = useCookie("user");
  if (import.meta.server) {
    if (!user.value) {
      abortNavigation();
      return navigateTo("/");
    }
  }

  if (!isLoggedIn.value) {
    abortNavigation();
    return navigateTo("/");
  }
});

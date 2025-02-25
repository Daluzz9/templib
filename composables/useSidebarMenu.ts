export enum SidebarMenuEnum {
  ACCOUNT_OVERVIEW = "ACCOUNT_OVERVIEW",
  ACCOUNT_DEPOSIT = "ACCOUNT_DEPOSIT",
  ACCOUNT_WITHDRAW = "ACCOUNT_WITHDRAW",
}

export const useSidebarMenu = createSharedComposable(() => {
  const currentSidebarMenu = ref<SidebarMenuEnum | undefined>(undefined);

  const openSidebarMenu = (sidebar: SidebarMenuEnum) => {
    currentSidebarMenu.value = sidebar;
  };

  const closeSidebarMenu = () => {
    currentSidebarMenu.value = undefined;
  };

  const handleNavigation = (url: string, newTab: boolean = false) => {
    closeSidebarMenu();
    if (newTab) {
      window.open(url, "_blank");
    } else {
      navigateTo(url);
    }
  };
  return {
    currentSidebarMenu,
    openSidebarMenu,
    closeSidebarMenu,
    handleNavigation,
  };
});

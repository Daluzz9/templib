<script setup lang="ts">
import { LazyAccountSideMenu, LazyDepositSideMenu, LazyWithdrawSideMenu } from "#components";

const menuMap = {
  [SidebarMenuEnum.ACCOUNT_OVERVIEW]: LazyAccountSideMenu,
  [SidebarMenuEnum.ACCOUNT_DEPOSIT]: LazyDepositSideMenu,
  [SidebarMenuEnum.ACCOUNT_WITHDRAW]: LazyWithdrawSideMenu,
};

const { currentSidebarMenu, closeSidebarMenu } = useSidebarMenu();

const currentMenuComponent = computed(() => {
  if (!currentSidebarMenu.value) return;
  return menuMap[currentSidebarMenu.value];
});

const handleUpdateOpen = (state: boolean) => {
  if (!state) closeSidebarMenu();
};
</script>

<template>
  <Sheet :open="!!currentMenuComponent" @update:open="handleUpdateOpen">
    <SheetContent>
      <component :is="currentMenuComponent" v-if="currentMenuComponent" />
    </SheetContent>
  </Sheet>
</template>

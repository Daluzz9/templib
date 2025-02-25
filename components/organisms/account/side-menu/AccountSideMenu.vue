<script lang="ts" setup>
import { getMenuAccountOverview } from "../static";

const { openSidebarMenu, handleNavigation, closeSidebarMenu } = useSidebarMenu();
const { logout } = useLogout();

const handleLogout = () => {
  logout();
  closeSidebarMenu();
};
</script>

<template>
  <div class="relative h-full overflow-y-auto bg-background-bg-section_main">
    <AccountOverview />

    <div class="p-4">
      <div class="mb-4 grid grid-cols-2 gap-3">
        <Button
          variant="secondary"
          class="h-12 w-full text-base font-bold leading-[22px] [&_svg]:size-5"
          @click="openSidebarMenu(SidebarMenuEnum.ACCOUNT_DEPOSIT)"
        >
          <SvgoAccountDeposit />
          <p>NẠP TIỀN</p>
        </Button>
        <Button
          variant="outline"
          class="h-12 w-full text-base font-bold leading-[22px] [&_svg]:size-5"
          @click="openSidebarMenu(SidebarMenuEnum.ACCOUNT_WITHDRAW)"
        >
          <SvgoAccountWithdraw />
          <p>RÚT TIỀN</p>
        </Button>
      </div>

      <div>
        <button
          v-for="menuItem in getMenuAccountOverview()"
          :key="menuItem.name"
          type="button"
          class="flex w-full items-center justify-between py-3"
          @click="handleNavigation(menuItem.link, menuItem.newTab)"
        >
          <div class="flex items-center gap-2">
            <component :is="menuItem.icon" class="text-2xl" filled />
            <p class="text-text-primary">{{ menuItem.name }}</p>
          </div>
          <SvgoArrow class="text-xl text-neutral-400" />
        </button>
      </div>

      <hr class="my-2 w-full border border-border-primary" />

      <button class="flex items-center justify-between py-3" @click="handleLogout()">
        <div class="flex items-center gap-2">
          <SvgoExit width="24px" filled class="text-2xl" />
          <p class="text-text-primary">Đăng xuất</p>
        </div>
      </button>
    </div>
  </div>
</template>

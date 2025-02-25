<script lang="ts" setup>
const { openSidebarMenu, handleNavigation } = useSidebarMenu();
const { menuAccountDepositMobile } = useAccountMenuDeposit();
</script>

<template>
  <div class="h-full overflow-y-auto bg-background-bg-section_main">
    <SheetHeader>
      <div class="flex items-center gap-2">
        <button type="button" @click="openSidebarMenu(SidebarMenuEnum.ACCOUNT_OVERVIEW)">
          <SvgoArrow class="rotate-180 text-[32px]" />
        </button>
        <p class="text-base font-semibold leading-[22px] text-text-primary">Nạp Tiền</p>
      </div>
      <button type="button" @click="handleNavigation(APP_PATH.HOME)">
        <Image src="home.svg" width="24px" height="24px" />
      </button>
    </SheetHeader>

    <div class="flex flex-col gap-3 p-4">
      <SideMenuNavigationItem
        v-for="card in menuAccountDepositMobile"
        :key="card.title"
        :icon="card.icon"
        :title="card.title"
        :description="card.description"
        :is-under-maintenance="card.isUnderMaintenance"
        :to="card.path"
        class="h-[70px]"
      />
    </div>
  </div>
</template>

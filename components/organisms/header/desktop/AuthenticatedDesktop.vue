<script lang="ts" setup>
const { logout } = useLogout();
const { currentUser } = useCurrentUser();
const route = useRoute();

const accountMenuListDropdown = computed(() => {
  const ctaMappedAccountMenuList = accountMenuList.map((menuItem) => {
    return {
      ...menuItem,
      cta: () => {
        dropdownMenu.value = undefined;
        navigateTo(menuItem.activeUrl);
      },
    };
  });

  const addedLoginFieldIntoAccountMenulist = [
    ...ctaMappedAccountMenuList,
    {
      name: "Đăng xuất",
      icon: "SvgoAccountLogout",
      activeUrl: "",
      activeUrlRelative: "",
      isHiddenInTab: false,
      cta: async () => {
        dropdownMenu.value = undefined;
        await logout();
      },
    },
  ];

  return addedLoginFieldIntoAccountMenulist.filter((accountMenuItem) => !accountMenuItem.isHiddenInDropdown);
});

const dropdownMenu = ref();
</script>

<template>
  <div v-if="currentUser" class="flex items-center justify-center gap-2">
    <div class="flex flex-col items-end">
      <p class="text-xs text-description">{{ currentUser.fullname }}</p>

      <div class="flex items-center gap-1 text-secondary-400">
        {{ currentUser.balance }} <Image src="K.webp" width="18px" height="18px" />
      </div>
    </div>
    <div class="flex items-center justify-center gap-3">
      <NavigationMenu v-model="dropdownMenu" disable-click-trigger>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger class="h-full px-0">
              <Avatar
                :avatar-img="currentUser.avatar ? `avatar/${currentUser.avatar}.webp` : `avatar/default-avatar.webp`"
              />
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div class="group absolute -right-16 top-[60px] rounded-2xl">
                <div>
                  <Image src="triangle-up.webp" width="20px" h="12px" class="absolute -top-3 right-5" />
                </div>

                <div
                  v-for="(menuInfo, index) in accountMenuListDropdown"
                  :key="menuInfo.name"
                  :class="{
                    'bg-neutral-600': menuInfo.activeUrl === route.path,
                    'rounded-t-lg': index === 0,
                    'rounded-b-lg': index === accountMenuListDropdown.length - 1,
                  }"
                  class="group/menu flex h-12 w-[197px] cursor-pointer items-center gap-2 bg-background-popup-header p-3 text-[16px] text-neutral-100 hover:bg-neutral-600"
                  @click="menuInfo.cta"
                >
                  <component
                    :is="menuInfo.icon"
                    :class="
                      cn('text-2xl text-description group-hover/menu:text-[#F2F2F2]', {
                        'text-[#F2F2F2]':
                          route.path?.includes(menuInfo.activeUrlRelative) || route.path?.includes(menuInfo.activeUrl),
                      })
                    "
                  />
                  <div
                    class="text-base group-hover/menu:text-white"
                    :class="[menuInfo.activeUrl === route.path ? 'text-white' : 'text-neutral-100']"
                  >
                    {{ menuInfo.name }}
                  </div>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <!-- TODO: Account Flow -->
      <Button size="lg" class="min-w-[132px] px-3" @click="navigateTo(APP_PATH.WITHDRAW_BANK)">Rút Tiền</Button>
      <Button size="lg" class="min-w-[132px]" variant="secondary" @click="navigateTo(APP_PATH.DEPOSIT_CODEPAY)"
        >Nạp Tiền</Button
      >
    </div>
  </div>
</template>

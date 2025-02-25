<script setup lang="ts">
const appStore = useAppStore();
const { amountRolling, isUserBankAvailable, systemPlan } = storeToRefs(appStore);
const { currentUser } = useCurrentUser();
const { userRank } = useUserRank();
const { handleNavigation } = useSidebarMenu();
const authenticatedList = computed(() => {
  return [
    {
      name: "phone",
      link: APP_PATH.PROFILE,
      isVerified: currentUser.value?.is_verify_phone,
      icon: currentUser.value?.is_verify_phone ? "account/active-phone.webp" : "account/inactive-phone.webp",
    },
    {
      name: "email",
      link: APP_PATH.PROFILE,
      isVerified: currentUser.value?.is_verify_email,
      icon: currentUser.value?.is_verify_email ? "account/active-email.webp" : "account/inactive-email.webp",
    },
    {
      name: "bank",
      link: APP_PATH.BANK,
      isVerified: isUserBankAvailable.value,
      icon: isUserBankAvailable.value ? "account/active-bank.webp" : "account/inactive-bank.webp",
    },
  ];
});
</script>
<template>
  <div class="relative bg-background-popup-body">
    <div
      class="before:z-1 z-2 relative isolate flex flex-col gap-4 rounded-lg p-4 before:absolute before:right-0 before:top-0 before:h-full before:w-full before:bg-[url(/images/account/bg-account-overview.webp)] before:bg-cover before:bg-right-top before:bg-no-repeat"
    >
      <div class="isolate flex flex-row gap-2">
        <Image :src="`avatar/${currentUser?.avatar}.webp`" width="46px" height="46px" class="flex-none rounded-full" />
        <div class="flex flex-col items-start gap-0.5">
          <p class="line-clamp-1 overflow-hidden text-ellipsis break-all text-xl font-semibold text-text-primary">
            {{ currentUser?.fullname || currentUser?.username }}
          </p>
          <div class="flex items-center justify-center gap-1 text-xs text-text-primary">
            <Image src="/account/rank.webp" width="16px" height="16px" />
            <span>Vip {{ userRank === 0 ? userRank + 1 : 0 }}</span>
          </div>
        </div>
      </div>
      <div class="isolate flex flex-col gap-0.5">
        <div class="grid grid-flow-col grid-cols-[auto_1fr] gap-1">
          <p class="text-sm font-normal text-text-secondary">Ví của tôi</p>
          <p class="text-right text-base font-semibold leading-[22px] text-secondary">
            {{
              formatVNDCurrency(currentUser?.balance, {
                currencySymbol: CurrencySymbolEnum.NONE,
              })
            }}
            K
          </p>
        </div>
        <div
          v-if="systemPlan?.package_id && systemPlan?.package_id !== PackageEnum.HOAN_TRA"
          class="grid grid-flow-col grid-cols-[auto_1fr] gap-1"
        >
          <p class="flex items-center gap-1 text-sm font-normal text-text-secondary">
            <span>Cược yêu cầu</span>
            <!-- Show Tooltip -->
            <Popover>
              <PopoverTrigger>
                <SvgoHelp class="text-text-secondary" />
              </PopoverTrigger>
              <PopoverContent side="top" :side-offset="5">
                <span class="text-xs font-normal">Doanh thu vòng cược cần hoàn thành trước khi rút tiền</span>
              </PopoverContent>
            </Popover>
          </p>
          <p class="text-right text-base font-semibold leading-[22px] text-secondary">
            {{
              formatVNDCurrency(amountRolling / RATE_K_VND, {
                currencySymbol: CurrencySymbolEnum.NONE,
              })
            }}
            K
          </p>
        </div>
      </div>
    </div>
    <SheetClose
      class="absolute right-[22px] top-[22px] flex h-7 w-7 items-center justify-center rounded-full bg-tab-payment-bgDisabled p-1"
    >
      <SvgoClose class="text-xs text-white" />
    </SheetClose>
    <div
      v-if="!currentUser?.is_verify_phone || !currentUser?.is_verify_email || !isUserBankAvailable"
      class="flex h-[42px] items-center justify-between bg-custom-gradient-8 px-4"
    >
      <div class="flex items-center gap-2">
        <button v-for="item in authenticatedList" :key="item.name" @click="handleNavigation(item.link)">
          <Image :src="item.icon" :width="item.isVerified ? '21px' : '20px'" height="20px" alt="icon" />
        </button>
      </div>
      <p class="text-xs text-text-primary">Xác minh tài khoản để rút tiền nhanh</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TooltipArrow } from "radix-vue";
const appStore = useAppStore();
const { amountRolling, systemPlan } = storeToRefs(appStore);
const { currentUser } = useCurrentUser();
const { userRank } = useUserRank();
</script>
<template>
  <div v-if="currentUser" class="relative">
    <div class="isolate flex flex-row items-center gap-2">
      <Image :src="`avatar/${currentUser.avatar}.webp`" width="84px" height="84px" class="rounded-full" preload />
      <div class="flex flex-col items-start gap-[2px]">
        <p class="mb-1 max-w-[150px] truncate text-base font-semibold text-text-primary">
          {{ currentUser.fullname }}
        </p>
        <div class="flex items-center justify-center gap-1 rounded-[10px] text-sm text-text-primary">
          <Image :src="`/vip/${(userRank || 0) + 1}.webp`" width="24px" preload />
          <span>Vip {{ (userRank || 0) + 1 }}</span>
        </div>
      </div>
    </div>
    <hr class="my-3 border-border-primary" />
    <div class="isolate flex flex-col gap-3">
      <div class="grid grid-flow-col grid-cols-[auto_1fr] items-center gap-1 py-[6px]">
        <p class="flex flex-row items-center gap-1 text-sm font-normal text-text-primary">
          <SvgoWallet class="text-2xl text-primary-300" />
          <span>Ví của tôi</span>
        </p>
        <p class="text-right text-sm font-semibold text-secondary">
          {{
            formatVNDCurrency(currentUser.balance, {
              currencySymbol: CurrencySymbolEnum.NONE,
            })
          }}
          K
        </p>
      </div>
      <div
        v-if="systemPlan?.package_id && systemPlan?.package_id !== PackageEnum.HOAN_TRA"
        class="grid grid-flow-col grid-cols-[auto_1fr] items-center gap-1 py-[6px]"
      >
        <p class="flex items-center gap-1 text-sm font-normal text-text-primary">
          <SvgoTurnover class="text-2xl text-primary-300" />
          <span>Cược yêu cầu</span>

          <!-- Show Tooltip -->
          <TooltipProvider :disable-closing-trigger="true" :delay-duration="0">
            <Tooltip>
              <TooltipTrigger>
                <SvgoHelp class="text-sm" />
              </TooltipTrigger>

              <TooltipContent
                class="z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-sm text-neutral-600 text-primary-foreground animate-in fade-in-0 zoom-in-95"
                side="top"
                :side-offset="5"
              >
                <span class="text-xs font-normal text-neutral-600"
                  >Doanh thu vòng cược cần hoàn thành trước khi rút tiền</span
                >
                <TooltipArrow class="fill-white" :width="8" />
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </p>
        <p class="text-right text-sm font-semibold text-secondary">
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
</template>

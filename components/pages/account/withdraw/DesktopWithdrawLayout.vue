<script setup lang="ts">
import { NuxtLink } from "#components";

const { menuAccountWithdraw } = useAccountMenuWithdraw();
</script>
<template>
  <div class="wrapper-withdraw relative min-h-[666px] w-full">
    <div
      class="relative z-20 flex h-[62px] w-[calc(100%-544px)] flex-col items-center rounded-[12px_12px_0_0] px-6 pt-3"
    >
      <!-- Teleport promotion block withdraw here -->
      <div id="block-withdraw" class="w-full" />

      <!-- <MenuMethods /> -->
      <div class="menu-method w-full border-b-[1px] border-b-neutral-500">
        <Tabs :class="cn('w-100 h-[42px]', 'flex flex-row flex-wrap items-center gap-6')">
          <AccountSubMenuMethodItem
            v-for="item in menuAccountWithdraw"
            :key="item.name"
            :title="item.name"
            :navigate-to="item.path"
            :is-active="$route.fullPath?.startsWith(item.path)"
            :is-under-maintenance="item.isUnderMaintenance"
            :as="NuxtLink"
            :class="
              cn(
                'border-bottom group flex h-[42px] items-center justify-center',
                'text-base font-semibold hover:border-primary-300',
              )
            "
          />
        </Tabs>
      </div>
    </div>
    <div class="absolute top-0 h-full w-full">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup lang="ts">
import { NuxtLink } from "#components";

const { menuAccountDeposit } = useAccountMenuDeposit();
</script>
<template>
  <div class="wrapper-deposit relative min-h-[666px] w-full">
    <div
      class="relative z-20 flex min-h-[62px] w-[calc(100%-544px)] flex-col items-center rounded-[12px_12px_0_0] px-6 pt-3"
    >
      <!-- Teleport promotion block deposit here -->
      <div id="block-deposit" class="w-full" />
      <!-- <MenuMethods /> -->
      <div class="menu-method w-full border-b-[1px] border-b-neutral-500">
        <Tabs :class="cn('w-100 h-[42px]', 'flex flex-row flex-wrap items-center gap-6')">
          <AccountSubMenuMethodItem
            v-for="item in menuAccountDeposit"
            :key="item.name"
            :title="item.name"
            :navigate-to="item.path"
            :is-active="item.path.includes($route.path)"
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
      <ClientOnly>
        <NuxtPage />
      </ClientOnly>
    </div>
  </div>
</template>

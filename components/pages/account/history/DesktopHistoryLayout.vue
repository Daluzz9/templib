<script lang="ts" setup>
const route = useRoute();
const router = useRouter();
</script>

<template>
  <div class="w-full rounded bg-neutral-750 p-6 fade-in">
    <div class="flex w-max gap-6 border-b border-border-primary">
      <NuxtLink
        v-for="(item, index) in accountHistoryMenus"
        :id="`tab-${item.name}`"
        :key="index"
        :class="
          cn(
            'flex h-[42px] cursor-pointer items-center gap-2 border-b-2 border-[transparent] px-3 py-1.5 text-base font-semibold capitalize leading-[22px] text-primary',
            {
              'border-primary-300 text-primary-300': route.fullPath.includes(item.path),
            },
          )
        "
        @click="router.push(item.path)"
      >
        <div :class="{ 'text-primary-300': route.fullPath.includes(item.path) }">
          {{ item.name }}
        </div>
      </NuxtLink>
    </div>
    <div class="pt-[19px]">
      <NuxtPage />
    </div>
  </div>
</template>

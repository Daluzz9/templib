<script lang="ts" setup>
import { featuredAliasesMB } from "./static";
const { getJackpotSummaryByAlias } = useJackpot();
</script>

<template>
  <FeatureGrid8V2 :items="featuredAliasesMB">
    <template #item="{ item, index }">
      <NuxtLink :to="item.path" class="relative block h-full w-full">
        <Image :src="item.image" class="rounded-lg" height="100%" loading="eager" self-host>
          <template #sub="{ isLoaded }">
            <div
              v-if="isLoaded"
              class="absolute z-image-overlay flex w-full flex-col justify-center"
              :class="[index === 0 ? 'left-3 top-1/2 -translate-y-1/2 text-base' : 'top-1.5 items-center text-xs']"
            >
              <p class="featured-alias-label-mb">
                {{ item.label }}
              </p>

              <JackpotWrapper v-if="item.alias && getJackpotSummaryByAlias(item.alias)">
                <AnimatedNumber :value="getJackpotSummaryByAlias(item.alias)" :init-number="0" />
              </JackpotWrapper>
            </div>
          </template>
        </Image>
      </NuxtLink>
    </template>
  </FeatureGrid8V2>
</template>

<style lang="scss" scoped>
.featured-alias-label-mb {
  background: linear-gradient(180deg, #fff 0%, #d2c579 24.4%, #f7ecb9 47.9%, #ffefad 55.6%, #ffd000 83.93%);
  color: transparent;
  @apply bg-clip-text font-utm-hanzel uppercase sm:text-lg;
}
</style>

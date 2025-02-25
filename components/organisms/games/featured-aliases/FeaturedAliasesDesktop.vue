<script lang="ts" setup>
import { featuredAliasesPC } from "./static";

const { getJackpotSummaryByAlias } = useJackpot();
</script>

<template>
  <FeatureGrid8V1 :items="featuredAliasesPC" class="aspect-[3.72/1] w-full">
    <template #item="{ item }">
      <NuxtLink :to="item.path" class="relative block h-full">
        <Image
          :src="item.image"
          :alt="item.label"
          height="100%"
          class="rounded-lg"
          effect="mirror"
          loading="eager"
          self-host
        >
          <template #sub="{ isLoaded }">
            <div
              v-if="isLoaded"
              class="absolute top-3 z-image-overlay flex w-full flex-col items-center justify-center"
            >
              <p class="featured-alias-label-pc">
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
  </FeatureGrid8V1>
</template>

<style lang="scss" scoped>
.featured-alias-label-pc {
  background: linear-gradient(180deg, #fff 0%, #d2c579 24.4%, #f7ecb9 47.9%, #ffefad 55.6%, #ffd000 83.93%);
  color: transparent;
  @apply bg-clip-text text-center font-utm-hanzel text-xl uppercase leading-7;
}
</style>

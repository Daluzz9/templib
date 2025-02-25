<script setup lang="ts">
import { NuxtLink } from "#components";

const { promotionEvents, status, error } = usePromotions();
</script>
<template>
  <div class="relative m-auto h-full w-full">
    <LoadingSpinner v-if="status === 'pending'" position="center" />
    <div v-else-if="error || !promotionEvents?.length" class="relative top-1/2 h-full w-full translate-y-1/2">
      <PromotionEmpty />
    </div>
    <div v-else class="grid grid-rows-1 gap-4">
      <PromotionViewItem
        v-for="event in promotionEvents"
        :key="event.alias"
        :title="event.title"
        :img="event.img"
        :tag-img="event.tags?.img"
        :navigate-to="{
          path: `${APP_PATH.PROMOTION}/${event.alias}`,
        }"
        :as="NuxtLink"
      />
    </div>
  </div>
</template>

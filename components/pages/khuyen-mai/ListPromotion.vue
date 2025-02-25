<script setup lang="ts">
import { NuxtLink } from "#components";

const { promotionEvents, status, error } = usePromotions();
</script>
<template>
  <div class="m-auto h-full min-h-[300px] w-full">
    <LoadingSpinner v-if="status === 'pending'" position="center" class="min-h-[300px]" />
    <PromotionEmpty v-else-if="error || !promotionEvents?.length" class="min-h-[300px] w-full" />
    <div v-else class="grid grid-cols-3 gap-6">
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

<script lang="ts" setup>
import Image from "~/components/atomics/custom/Image.vue";

const { status, promotionDetail, tabs, createNewDeposit, authDialogController, breadcrumbs, generateCTA } =
  usePromotionByAlias(useRoute().params.slug as string);
</script>
<template>
  <div class="px-8 py-6">
    <div class="mx-auto max-w-account">
      <Breadcrumb :breadcrumbs="breadcrumbs" />
      <LoadingSpinner v-if="status === 'pending'" position="center" class="min-h-[300px]" />
      <template v-else>
        <div v-if="promotionDetail?.theme.banner_landing_page" class="mt-6 h-full w-full">
          <Image
            :src="promotionDetail?.theme.banner_landing_page"
            :alt="promotionDetail?.event_name"
            class="aspect-[1280/250] w-full rounded-lg object-cover"
          />
        </div>
        <TabPromotionDetail :tabs="tabs" :class="tabs.length > 1 && 'mt-6'">
          <template #bonus>
            <ListBonusPromotion :reward-periods="promotionDetail?.reward_periods" />
          </template>
        </TabPromotionDetail>
        <div v-if="Object.values(generateCTA.style).every(Boolean)" class="mt-6 flex items-center justify-center">
          <Button variant="ghost" :style="generateCTA.style" class="text-base font-bold" @click="createNewDeposit">{{
            generateCTA.text
          }}</Button>
        </div>
      </template>
    </div>
  </div>
  <AuthDialog v-if="authDialogController.isOpen.value" :controller="authDialogController" />
</template>

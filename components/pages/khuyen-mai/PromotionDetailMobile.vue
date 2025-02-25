<script lang="ts" setup>
import Image from "~/components/atomics/custom/Image.vue";

const { status, promotionDetail, tabs, createNewDeposit, authDialogController, breadcrumbs, generateCTA } =
  usePromotionByAlias(useRoute().params.slug as string);
</script>
<template>
  <PageLayoutMobile class="min-h-dvh bg-background-popup-body pb-16">
    <template #header>
      <HeaderMobile>
        <template #left>
          <a class="flex items-center" @click.prevent="navigateTo(breadcrumbs[1].url)">
            <Image src="back.svg" width="32px" height="32px" />
            <span>Chi tiết</span>
          </a>
        </template>
      </HeaderMobile>
    </template>
    <template #main>
      <div class="h-full w-full p-4">
        <LoadingSpinner v-if="status === 'pending'" position="center" />
        <template v-else>
          <Image
            v-if="promotionDetail?.theme.banner_landing_page"
            :src="promotionDetail?.theme.banner_landing_page"
            :alt="promotionDetail?.event_name"
            class="aspect-[343/114] w-full rounded-lg object-cover"
          />
          <TabPromotionDetail :tabs="tabs" :class="tabs.length > 1 && 'mt-4'">
            <template #bonus>
              <ListBonusPromotionMobile :reward-periods="promotionDetail?.reward_periods" />
            </template>
          </TabPromotionDetail>
          <div v-if="Object.values(generateCTA.style).every(Boolean)" class="mt-4 flex items-center justify-center">
            <Button variant="ghost" :style="generateCTA.style" class="text-base font-bold" @click="createNewDeposit">
              {{ generateCTA.text }}
            </Button>
          </div>
        </template>
      </div>
    </template>
  </PageLayoutMobile>
  <AuthDialog v-if="authDialogController.isOpen.value" :controller="authDialogController" />
</template>

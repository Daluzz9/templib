<script setup lang="ts">
const { verifyInfo } = useVerifyEmail();
</script>
<template>
  <PageLayoutMobile class="min-h-dvh" main-class="bg-background-popup-body">
    <template #header>
      <PageHeaderMobile title="Xác thực Email" @back="navigateTo(APP_PATH.HOME)" />
    </template>
    <template #main>
      <div class="flex flex-col items-center justify-center gap-4 p-4">
        <Image v-if="verifyInfo?.icon" :src="verifyInfo?.icon" width="120px" />

        <div class="mx-auto w-full bg-custom-gradient-popup-verify-email p-3">
          <p class="text-center text-sm text-primary">{{ verifyInfo?.description }}</p>
        </div>
      </div>
    </template>
    <template #bottom>
      <div v-if="verifyInfo?.status" class="flex w-full justify-center gap-5 bg-background-popup-body p-4">
        <Button
          v-if="verifyInfo?.status === 'success'"
          class="h-12 w-full text-base font-bold"
          @click="navigateTo(APP_PATH.HOME)"
        >
          Về Trang Chủ
        </Button>
        <Button v-else class="h-12 w-full text-base font-bold" @click="navigateTo(APP_PATH.PROFILE)"
          >Xác Thực Lại</Button
        >
      </div>
    </template>
  </PageLayoutMobile>
</template>

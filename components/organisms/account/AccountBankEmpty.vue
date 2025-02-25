<script setup lang="ts">
const brandName = useRuntimeConfig().public.BRAND_NAME;
</script>
<template>
  <div class="h-auto min-h-80 w-full text-center">
    <Image src="/account/empty-card-bank.webp" alt="empty-bank" class="mx-auto" width="138px" preload />
    <h6 class="mb-6 mt-4 h-auto text-sm">Thêm tài khoản ngân hàng để bắt đầu giao dịch tại {{ brandName }}</h6>
    <div class="h-12">
      <AddBankDialog>
        <template #trigger="{ openDialog }">
          <Button class="h-12 w-[250px] text-base font-bold" @click="openDialog()">Thêm Ngân Hàng</Button>
        </template>
      </AddBankDialog>
    </div>
  </div>
</template>

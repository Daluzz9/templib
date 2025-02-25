<script setup lang="ts">
const config = useRuntimeConfig().public;

const emit = defineEmits(["back"]);

defineProps({
  title: {
    type: String,
    default: "",
  },
});
</script>
<template>
  <PageLayoutMobile class="min-h-dvh">
    <template #header>
      <PageHeaderMobile :title="title" @back="emit('back')" />
    </template>
    <template #main>
      <div class="h-auto min-h-80 w-full p-4 pt-24 text-center">
        <Image src="/account/empty-card-bank.webp" alt="empty-bank" class="mx-auto" width="138px" />
        <h6 class="my-6 h-auto text-sm">Thêm tài khoản ngân hàng để bắt đầu giao dịch tại {{ config.BRAND_NAME }}</h6>
      </div>
    </template>
    <template #bottom>
      <div class="p-4">
        <AddBankDialog>
          <template #trigger="{ openDialog }">
            <Button class="h-12 w-full text-base font-bold" @click="openDialog()">Thêm Ngân Hàng</Button>
          </template>
        </AddBankDialog>
      </div>
    </template>
  </PageLayoutMobile>
</template>

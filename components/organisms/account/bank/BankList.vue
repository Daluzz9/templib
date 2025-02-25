<script setup lang="ts">
type IProps = {
  userBankList?: IMappedUserBank[];
};
const props = defineProps<IProps>();

const activeBankId = ref<string>();

const toggleDetails = (bankId: string) => {
  activeBankId.value = activeBankId.value === bankId ? undefined : bankId;
};

onMounted(() => {
  activeBankId.value = props.userBankList?.[0]?.id;
});
</script>
<template>
  <div class="mx-auto flex w-[450px] flex-col gap-6">
    <div class="flex flex-col gap-4">
      <BankItem
        v-for="bank in userBankList"
        :key="bank.id"
        :item="bank"
        :is-show-detail="activeBankId === bank.id"
        @click="toggleDetails(bank.id)"
      />
      <p class="text-center text-xs text-text-secondary">
        Bạn muốn thay đổi thông tin tài khoản? Vui lòng liên hệ CSKH 24/7.
      </p>
    </div>
    <AddBankDialog v-if="(userBankList?.length || 0) < NUMBER_OF_BANK_LIMIT">
      <template #trigger="{ openDialog }">
        <Button class="h-12 text-base font-bold" @click="openDialog()">Thêm Ngân Hàng</Button>
      </template>
    </AddBankDialog>
  </div>
</template>

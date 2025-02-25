<script setup lang="ts">
type IProps = {
  item: IMappedUserBank;
  isShowDetail: boolean;
};
defineProps<IProps>();
</script>
<template>
  <div class="cursor-pointer overflow-hidden rounded-lg shadow-lg outline outline-1 outline-border-primary">
    <div class="relative flex items-center justify-between bg-[url('/images/account/bg-bank-item.webp')] bg-cover p-3">
      <div class="flex items-center">
        <Image :src="item.img" width="44px" height="44px" alt="bank logo" class="mr-3" />
        <span class="text-base font-semibold text-white">{{ item.bank_code }}</span>
      </div>
      <span class="text-sm font-normal text-white">{{ item.bank_account_no_mask }}</span>
    </div>
    <div
      v-show="isShowDetail"
      class="flex flex-col gap-1 overflow-hidden rounded-b-lg bg-[#0606060D] p-3 transition-all duration-500 ease-in-out"
      :class="{ 'opacity-100': isShowDetail, 'max-h-0 opacity-0': !isShowDetail }"
    >
      <p class="flex items-center justify-between text-sm">
        <span class="text-text-secondary">Chủ tài khoản:</span>
        <span class="font-semibold text-text-primary">{{ item.bank_account_name_mask }}</span>
      </p>
      <p class="flex items-center justify-between text-sm">
        <span class="text-text-secondary">Số tài khoản:</span>
        <span class="font-semibold text-text-primary">{{ item.bank_account_no_mask }}</span>
      </p>
    </div>
  </div>
</template>

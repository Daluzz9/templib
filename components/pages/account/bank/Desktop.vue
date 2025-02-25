<script setup lang="ts">
const { mappedUserBankList, isUserBankAvailable } = await useUserBank();
</script>
<template>
  <AccountOverviewLayout class="h-account w-full grid-cols-account-layout-v1">
    <template #left>
      <div class="rounded-lg bg-background-menu-account p-6">
        <AccountOverviewDesktop />
      </div>
    </template>
    <template #right>
      <div class="rounded-lg bg-background-menu-account p-6">
        <AccountBankEmpty v-if="!isUserBankAvailable" class="pt-10" />
        <BankList v-else :user-bank-list="mappedUserBankList" />
      </div>
    </template>
  </AccountOverviewLayout>
</template>

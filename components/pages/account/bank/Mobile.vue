<script setup lang="ts">
const { mappedUserBankList, isUserBankAvailable } = await useUserBank();
const { handlePageBack } = useBackNavigation();
const { openSidebarMenu } = useSidebarMenu();

const handleBack = () => {
  openSidebarMenu(SidebarMenuEnum.ACCOUNT_OVERVIEW);
  handlePageBack();
};
</script>
<template>
  <AccountBankEmptyMobile v-if="!isUserBankAvailable" title="Quản Lý Ngân Hàng" @back="handleBack()" />
  <BankListMobile v-else :user-bank-list="mappedUserBankList" />
</template>

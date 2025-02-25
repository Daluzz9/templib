<script setup lang="ts">
const appStore = useAppStore();

const { handlePageBack } = useBackNavigation();
const { openSidebarMenu } = useSidebarMenu();

const handleBack = () => {
  openSidebarMenu(SidebarMenuEnum.ACCOUNT_DEPOSIT);
  handlePageBack();
};
</script>
<template>
  <AccountBankEmptyMobile v-if="!appStore.isUserBankAvailable" title="Nạp Qua CodePay2" @back="handleBack()" />
  <FormDepositCodePay2Mobile v-else />
</template>

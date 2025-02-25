<script setup lang="ts">
type IProps = {
  userBankList?: IMappedUserBank[];
};

const { handlePageBack } = useBackNavigation();
const { openSidebarMenu } = useSidebarMenu();

const props = defineProps<IProps>();

const activeBankId = ref<string>();

const toggleDetails = (bankId: string) => {
  activeBankId.value = activeBankId.value === bankId ? undefined : bankId;
};

const handleBack = () => {
  openSidebarMenu(SidebarMenuEnum.ACCOUNT_OVERVIEW);
  handlePageBack();
};

onMounted(() => {
  activeBankId.value = props.userBankList?.[0]?.id;
});
</script>
<template>
  <PageLayoutMobile class="min-h-dvh">
    <template #header>
      <PageHeaderMobile title="Quản Lý Ngân Hàng" @back="handleBack()" />
    </template>
    <template #main>
      <div class="flex flex-col gap-4 p-4">
        <BankItem
          v-for="bank in userBankList"
          :key="bank.id"
          :item="bank"
          :is-show-detail="activeBankId === bank.id"
          @click="toggleDetails(bank.id)"
        />
        <p class="text-left text-xs text-text-secondary">
          Bạn muốn thay đổi thông tin tài khoản? Vui lòng liên hệ CSKH 24/7.
        </p>
      </div>
    </template>
    <template #bottom>
      <div class="p-4">
        <AddBankDialog v-if="(userBankList?.length || 0) < NUMBER_OF_BANK_LIMIT">
          <template #trigger="{ openDialog }">
            <Button class="h-12 w-full text-base font-bold" @click="openDialog()">Thêm Ngân Hàng</Button>
          </template>
        </AddBankDialog>
      </div>
    </template>
  </PageLayoutMobile>
</template>

<script setup lang="ts">
const {
  addBankValidationSchema,
  addBankDialogController,
  fieldBankAccountNo,
  fieldBankAccountName,
  formAddBankValues,
  submitAddBank,
  isSubmitting,
  bankListNotUsed,
  bankSelected,
  isAddBankDisabled,
  resetFormAddBankValues,
} = await useUserBank();

const searchQuery = ref("");
const isDropdownOpen = ref<boolean>(false);

const bankListFilter = computed(() => {
  if (searchQuery.value) {
    return bankListNotUsed.value?.filter((bank) => {
      const bankName = normalizeDiacritics(bank.bank_name);
      const keyword = normalizeDiacritics(searchQuery.value);
      return bankName.includes(keyword);
    });
  }
  return bankListNotUsed.value;
});

const handleOpenDialog = (isOpen: boolean) => {
  if (!isOpen) {
    searchQuery.value = "";
    resetFormAddBankValues();
  }
};

// reset search query when dropdown is closed
watch(
  () => isDropdownOpen.value,
  (value: boolean) => {
    if (!value) {
      searchQuery.value = "";
    }
  },
);
</script>

<template>
  <Form
    v-slot="{ handleSubmit, errors }"
    as=""
    :validation-schema="addBankValidationSchema"
    :initial-values="formAddBankValues"
  >
    <Dialog
      v-if="addBankDialogController.isOpen.value"
      :controller="addBankDialogController"
      :type="DialogTypeEnum.ADD_BANK"
      class="border-none"
      @update:open="handleOpenDialog"
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle class="text-base font-semibold lg:text-xl">Thông Tin Ngân Hàng </DialogTitle>
        </DialogHeader>

        <DialogBody>
          <form id="dialogAddBankForm" @submit.prevent="handleSubmit($event, submitAddBank as any)">
            <div class="flex flex-col gap-4">
              <FormField name="bank">
                <FormItem>
                  <FormLabel class="text-label">Ngân Hàng</FormLabel>
                  <DropdownMenu v-model:open="isDropdownOpen">
                    <DropdownMenuTrigger
                      class="w-full rounded-lg border border-input-border bg-input-bg data-[state=open]:border-input-focus-border"
                    >
                      <DropdownMenuToggle class="h-12">
                        <div
                          v-if="bankSelected?.bank_name"
                          class="flex items-center gap-2 font-nunito text-sm font-normal text-primary"
                        >
                          <Image :src="bankSelected?.img" height="32px" width="32px" />
                          <p>{{ bankSelected?.bank_name }}</p>
                        </div>
                        <template v-else> Chọn Ngân Hàng </template>
                      </DropdownMenuToggle>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      class="scrollbar-thumb-rounded-md z-[10000] max-h-[276px] overflow-y-auto rounded-lg border border-white/10 bg-neutral-600 p-0 scrollbar-thin scrollbar-track-[transparent] scrollbar-thumb-neutral-500"
                    >
                      <DropdownMenuSearch v-model="searchQuery" placeholder="Tìm theo tên ngân hàng" />
                      <DropdownMenuRadioGroup v-model="formAddBankValues.bank_code">
                        <DropdownItemWIcon
                          v-for="bank in bankListFilter"
                          :key="bank.bank_code"
                          :value="bank.bank_code"
                          :is-icon-left="true"
                          :label="bank.bank_name"
                          :icon="bank.img"
                        />
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <FormMessage />
                </FormItem>
              </FormField>

              <FormField v-slot="{ componentField }" :name="fieldBankAccountNo.key">
                <FormItem>
                  <FormLabel class="text-label">{{ fieldBankAccountNo.label }}</FormLabel>
                  <FormControl>
                    <InputText
                      v-model="formAddBankValues.bank_account_no"
                      :type="fieldBankAccountNo.type"
                      :max-length="fieldBankAccountNo.maxLength"
                      :name="componentField.name"
                      class="h-12"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>

              <FormField v-slot="{ componentField }" :name="fieldBankAccountName.key">
                <FormItem>
                  <FormLabel>{{ fieldBankAccountName.label }}</FormLabel>
                  <FormControl>
                    <InputText
                      v-model="formAddBankValues.bank_account_name"
                      :type="fieldBankAccountName.type"
                      :max-length="fieldBankAccountName.maxLength"
                      :name="componentField.name"
                      :disabled="fieldBankAccountName.disabled"
                      class="h-12"
                      not-allow-multiple-spaces
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
            </div>
          </form>

          <Button
            type="submit"
            form="dialogAddBankForm"
            :disabled="Object.keys(errors).length || isAddBankDisabled || isSubmitting"
            :is-loading="isSubmitting"
            class="h-12 w-full text-base font-bold"
          >
            Xác Nhận
          </Button>
        </DialogBody>
      </DialogContent>
    </Dialog>
  </Form>
  <slot name="trigger" :open-dialog="addBankDialogController.openDialog" />
</template>

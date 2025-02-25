<script setup lang="ts">
const {
  formFields,
  formProfileValues,
  FieldEnum,
  isVerifiedEmail,
  isVerifiedPhone,
  allowChangePassword,
  isChangingPassword,
  cancelChangePassword,
  profileValidationSchema,
  updateProfile,
  isEnableButtonSubmit,
  isSendingVerifyEmail,
  sendVerifyEmail,
  setRef,
  isValidChangeProfile,
} = useProfileInfo();

const { handlePageBack } = useBackNavigation();
const { openSidebarMenu } = useSidebarMenu();
const verifyPhoneDialogCtl = useDialog();

const openVerifyPhone = async () => {
  // Update profile before open verify phone dialog
  if (isValidChangeProfile.value) {
    await updateProfile(false);
  }
  verifyPhoneDialogCtl.openDialog();
};

const handleBack = () => {
  openSidebarMenu(SidebarMenuEnum.ACCOUNT_OVERVIEW);
  handlePageBack();
};
</script>
<template>
  <VerifyPhoneDialog
    v-if="verifyPhoneDialogCtl.isOpen.value"
    :controller="verifyPhoneDialogCtl"
    :phone="formProfileValues.phone"
  />
  <Form
    v-slot="{ errors, isSubmitting }"
    class="block w-full"
    :validation-schema="profileValidationSchema"
    :initial-values="formProfileValues"
    @submit="updateProfile()"
  >
    <PageLayoutMobile class="min-h-dvh">
      <template #header>
        <PageHeaderMobile title="Quản Lý Tài Khoản" @back="handleBack()" />
      </template>
      <template #main>
        <div class="grid grid-flow-row gap-y-3 p-4">
          <template v-for="fieldItem in formFields" :key="fieldItem.key">
            <FormField
              v-if="fieldItem.isShow"
              v-slot="{ componentField }"
              :key="fieldItem.key"
              :name="fieldItem.key"
              class="w-full"
            >
              <FormItem>
                <FormLabel class="font-semibold text-text-primary">{{ fieldItem.label }}</FormLabel>
                <FormControl>
                  <InputText
                    :ref="(el: unknown) => setRef(el, fieldItem.key)"
                    v-model.trim="formProfileValues[fieldItem.key as keyof typeof formProfileValues]"
                    :type="fieldItem.type"
                    :min-length="fieldItem.minLength"
                    :max-length="fieldItem.maxLength"
                    :name="componentField.name"
                    :disabled="fieldItem.disabled"
                    autocomplete="new-password"
                  >
                    <template
                      v-if="
                        fieldItem.key === FieldEnum.EMAIL &&
                        !!formProfileValues[fieldItem.key] &&
                        !errors[fieldItem.key]
                      "
                      #suffix
                    >
                      <!-- Verify email  -->
                      <button
                        type="button"
                        class="text-sm"
                        tabindex="-1"
                        :class="[fieldItem.disabled ? 'pointer-events-none text-text-secondary' : 'text-primary-300']"
                        @click.prevent="sendVerifyEmail()"
                      >
                        <SvgoDone v-if="isVerifiedEmail" class="text-xl text-[#1CB968]" />
                        <span v-else>{{ isSendingVerifyEmail ? "Đang xác thực" : "Xác thực" }}</span>
                      </button>
                    </template>
                    <!-- Verify phone  -->
                    <template
                      v-else-if="
                        fieldItem.key === FieldEnum.PHONE &&
                        !!formProfileValues[fieldItem.key] &&
                        !errors[fieldItem.key]
                      "
                      #suffix
                    >
                      <button
                        type="button"
                        class="text-sm"
                        :class="[fieldItem.disabled ? 'pointer-events-none text-text-secondary' : 'text-primary-300']"
                        tabindex="-1"
                        @click.prevent="openVerifyPhone()"
                      >
                        <SvgoDone v-if="isVerifiedPhone" class="text-xl text-[#1CB968]" />
                        <span v-else>Xác thực</span>
                      </button>
                    </template>

                    <!-- Change password  -->
                    <template v-else-if="fieldItem.key === FieldEnum.MASK_PASSWORD && !isChangingPassword" #suffix>
                      <button
                        type="button"
                        class="text-sm text-primary-300"
                        tabindex="-1"
                        @click.prevent="allowChangePassword()"
                      >
                        Đổi mật khẩu
                      </button>
                    </template>
                  </InputText>
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </template>
        </div>
      </template>
      <template #bottom>
        <div class="flex w-full justify-center gap-5 bg-background-menu-account p-4">
          <Button
            v-if="isChangingPassword"
            class="font-base h-12 w-full rounded-lg border font-bold"
            size="xl"
            variant="secondary"
            @click.prevent="cancelChangePassword()"
          >
            Hủy Thay Đổi
          </Button>
          <Button
            :disabled="Object.keys(errors).length || !isEnableButtonSubmit"
            type="submit"
            class="font-base h-12 w-full rounded-lg font-bold"
            size="xl"
            :is-loading="isSubmitting"
          >
            Lưu Thay Đổi
          </Button>
        </div>
      </template>
    </PageLayoutMobile>
  </Form>
</template>

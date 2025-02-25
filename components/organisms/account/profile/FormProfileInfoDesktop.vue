<script setup lang="ts">
const {
  formFields,
  formProfileValues,
  FieldEnum,
  isVerifiedEmail,
  isVerifiedPhone,
  isChangingPassword,
  profileValidationSchema,
  updateProfile,
  isEnableButtonSubmit,
  isSendingVerifyEmail,
  sendVerifyEmail,
  setRef,
  isValidChangeProfile,
} = useProfileInfo();

const { verifyInfo } = useVerifyEmail();

const currentRoute = useRoute();

const verifyPhoneDialogCtl = useDialog();

const verifyEmailDialogCtl = useDialog();

const changePasswordDialogCtl = useDialog();

const authDialogCtl = useDialog(DialogTypeEnum.FORGOT_PASSWORD);

onMounted(async () => {
  // Verify email by token
  if (currentRoute.query.token) {
    verifyEmailDialogCtl.openDialog();
  }
});

const openVerifyPhone = async () => {
  // Update profile before open verify phone dialog
  if (isValidChangeProfile.value) {
    await updateProfile(false);
  }
  verifyPhoneDialogCtl.openDialog();
};
</script>
<template>
  <ChangePasswordDialog
    v-if="changePasswordDialogCtl.isOpen.value"
    :controller="changePasswordDialogCtl"
    @open-forgot-password="authDialogCtl.openDialog(DialogTypeEnum.FORGOT_PASSWORD)"
  />

  <AuthDialog v-if="authDialogCtl.isOpen.value" :controller="authDialogCtl" />

  <VerifyEmailDialog
    v-if="verifyEmailDialogCtl.isOpen.value"
    :description="verifyInfo?.description"
    :icon="verifyInfo?.icon"
    :status="verifyInfo?.status"
    :controller="verifyEmailDialogCtl"
  />
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
    <div class="grid grid-cols-2 grid-rows-1 gap-x-8 gap-y-4">
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
                v-model="formProfileValues[fieldItem.key as keyof typeof formProfileValues]"
                :type="fieldItem.type"
                trim
                :min-length="fieldItem.minLength"
                :max-length="fieldItem.maxLength"
                :name="componentField.name"
                :disabled="fieldItem.disabled"
                autocomplete="new-password"
              >
                <template
                  v-if="
                    fieldItem.key === FieldEnum.EMAIL && !!formProfileValues[fieldItem.key] && !errors[fieldItem.key]
                  "
                  #suffix
                >
                  <!-- Verify email  -->
                  <button
                    type="button"
                    class="text-sm text-primary-300"
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
                    !errors[fieldItem.key]?.length
                  "
                  #suffix
                >
                  <button
                    type="button"
                    class="text-sm text-primary-300"
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
                    @click.prevent="changePasswordDialogCtl.openDialog()"
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
    <div class="mt-8 flex w-full justify-center gap-5">
      <Button
        :disabled="!isEnableButtonSubmit || Object.keys(errors).length"
        type="submit"
        class="h-12 w-[250px] font-bold"
        size="xl"
        :is-loading="isSubmitting"
      >
        Lưu Thay Đổi
      </Button>
    </div>
  </Form>
</template>

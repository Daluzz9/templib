<script lang="ts" setup>
const props = defineProps({
  controller: {
    type: Object as PropType<IUseDialog>,
    required: true,
  },
});

const {
  formFields,
  formProfileValues,
  changePasswordValidationSchema,
  submitUpdatePassword,
  setRef,
  FieldEnum,
  dynamicRefs,
} = useProfileInfo();

const formFieldsChangePassword = computed(() => {
  return formFields.filter((field) =>
    [FieldEnum.NEW_PASSWORD, FieldEnum.CONFIRM_NEW_PASSWORD, FieldEnum.PASSWORD].includes(
      field.key as typeof FieldEnum.PASSWORD,
    ),
  );
});

const isValidChangePassword = computed(() => {
  return formFieldsChangePassword.value.every(
    (field) => !!formProfileValues[field.key as keyof typeof formProfileValues],
  );
});

onMounted(() => {
  nextTick(() => {
    dynamicRefs.value?.[FieldEnum.PASSWORD as string]?.focus();
  });
});

const emit = defineEmits(["open-forgot-password"]);

const handleSubmitForm = async () => {
  const isSucceeded = await submitUpdatePassword();
  if (isSucceeded) {
    props.controller.closeDialog();
  }
};
</script>
<template>
  <Dialog :controller="controller" :type="DialogTypeEnum.CHANGE_PASSWORD">
    <DialogTrigger as-child>
      <slot name="trigger" />
    </DialogTrigger>
    <DialogContent class="sm:w-full sm:rounded-lg lg:h-auto">
      <DialogHeader>
        <DialogTitle class="text-primary">Đổi mật khẩu</DialogTitle>
      </DialogHeader>

      <DialogBody>
        <Form
          v-slot="{ errors, isSubmitting }"
          class="relative block flex w-full flex-col gap-3"
          :validation-schema="changePasswordValidationSchema"
          :initial-values="formProfileValues"
          @submit="handleSubmitForm"
        >
          <template v-for="fieldItem in formFieldsChangePassword" :key="fieldItem.key">
            <FormField v-slot="{ componentField }" :name="fieldItem.key">
              <FormItem>
                <FormLabel class="font-semibold text-text-primary">{{ fieldItem.label }}</FormLabel>
                <FormControl>
                  <InputText
                    :ref="(el: unknown) => setRef(el, fieldItem.key)"
                    v-model="formProfileValues[fieldItem.key as keyof typeof formProfileValues]"
                    :type="fieldItem.type"
                    :min-length="fieldItem.minLength"
                    :max-length="fieldItem.maxLength"
                    :name="componentField.name"
                    :disabled="fieldItem.disabled"
                    autocomplete="new-password"
                  />
                  <button
                    v-if="fieldItem.key === FieldEnum.PASSWORD"
                    class="mt-1 block text-sm font-normal text-[#3D85D6] underline"
                    @click.prevent="emit('open-forgot-password')"
                  >
                    Quên mật khẩu
                  </button>
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </template>

          <Button
            :disabled="!isValidChangePassword || !!Object.keys(errors).length || isSubmitting"
            class="mt-3 h-12 w-full bg-primary-400 text-base font-bold"
            :is-loading="isSubmitting"
            type="submit"
          >
            Xác Nhận
          </Button>
        </Form>
      </DialogBody>
    </DialogContent>
  </Dialog>
</template>

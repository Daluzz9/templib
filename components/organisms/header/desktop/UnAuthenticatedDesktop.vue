<script lang="ts" setup>
const { logIn, isLogInProcessing, loginValidationSchema } = useLogin();
const authDialogController = useDialog();

const showErrorTimeout = ref<NodeJS.Timeout>();
const error = ref<string>();
const handleInvalidSubmit = ({ errors }: { errors: ILoginBody }) => {
  error.value = errors.username || errors.password;
  showErrorTimeout.value = setTimeout(() => {
    error.value = "";
  }, 5000);
};

const onFormChange = () => {
  clearTimeout(showErrorTimeout.value);
  error.value = undefined;
};
</script>

<template>
  <Form
    id="fast-login-form"
    as="form"
    keep-values
    :validation-schema="loginValidationSchema"
    class="relative flex items-center justify-center gap-3"
    @submit="logIn($event as ILoginBody)"
    @invalid-submit="handleInvalidSubmit"
    @input="onFormChange"
  >
    <FormField v-slot="{ componentField, value }" name="username">
      <FormItem>
        <FormControl disable-error-styles>
          <InputText
            :name="componentField.name"
            class="h-10 w-[200px]"
            placeholder="Tên đăng nhập"
            :max-length="validate.username.max"
            :has-clear-btn="!!value"
          />
        </FormControl>
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="password">
      <FormItem>
        <FormControl disable-error-styles>
          <InputText
            :name="componentField.name"
            type="password"
            class="h-10 w-[200px]"
            placeholder="Mật khẩu"
            :max-length="validate.password.max"
          >
            <template #suffix>
              <button
                type="button"
                @click.stop.prevent="authDialogController.openDialog(DialogTypeEnum.FORGOT_PASSWORD)"
              >
                <SvgoQuestionLock class="text-xl" />
              </button>
            </template>
          </InputText>
        </FormControl>
      </FormItem>
    </FormField>

    <Transition name="fade">
      <div
        v-if="error"
        class="absolute -bottom-1 left-0 z-100 mt-0.5 w-full translate-y-full rounded-[10px] bg-neutral-700 p-2"
      >
        <div class="rounded-[10px] border border-dashed border-neutral-600 px-3 py-2 text-sm text-neutral-100">
          {{ error }}
        </div>
      </div>
    </Transition>
  </Form>

  <Button :is-loading="isLogInProcessing" :disabled="isLogInProcessing" size="lg" type="submit" form="fast-login-form">
    Đăng nhập
  </Button>

  <Button size="lg" variant="secondary" @click="authDialogController.openDialog(DialogTypeEnum.REGISTER)">
    Đăng Ký
  </Button>

  <AuthDialog v-if="authDialogController.isOpen.value" :controller="authDialogController" />
</template>

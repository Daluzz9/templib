<script setup lang="ts">
type ILoginForm = Omit<ILoginBody, "back">;

const emits = defineEmits(["open-register", "open-forgot-password", "succeed"]);

const { logIn, isLogInProcessing, loginValidationSchema } = useLogin();

const onSubmit = async (loginFormValue: ILoginForm) => {
  const { isSucceeded } = await logIn(loginFormValue);
  if (isSucceeded) emits("succeed");
};

onMounted(() => {
  autoFocusForm("#loginForm");
});
</script>

<template>
  <Form v-slot="{ handleSubmit }" keep-values :validation-schema="loginValidationSchema">
    <DialogHeader>
      <DialogTitle>Đăng nhập</DialogTitle>
    </DialogHeader>

    <DialogBody>
      <form id="loginForm" class="flex flex-col gap-3" @submit="handleSubmit($event, onSubmit as any)">
        <FormField v-slot="{ componentField, value }" name="username">
          <FormItem>
            <FormLabel>Tên đăng nhập</FormLabel>
            <FormControl>
              <InputText :name="componentField.name" :max-length="validate.username.max" :has-clear-btn="!!value" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="password">
          <FormItem>
            <FormLabel>Mật khẩu</FormLabel>
            <FormControl>
              <InputText :name="componentField.name" type="password" :max-length="validate.password.max" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <Checkbox id="terms" />
            <label
              for="terms"
              class="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Lưu tài khoản
            </label>
          </div>
          <Button
            variant="link"
            class="cursor-pointer text-sm font-medium text-primary-300 underline lg:px-0"
            disable-hover-effect
            @click="emits('open-forgot-password')"
          >
            Quên mật khẩu
          </Button>
        </div>
      </form>
      <div>
        <Button
          :is-loading="isLogInProcessing"
          type="submit"
          form="loginForm"
          class="h-12 w-full"
          size="lg"
          :disabled="isLogInProcessing"
        >
          Đăng Nhập
        </Button>

        <div class="flex items-center justify-center gap-1 pt-3 text-sm">
          <h3 class="text-primary">Bạn chưa có tài khoản?</h3>
          <Button class="!p-0 text-primary-300" variant="link" @click="emits('open-register')">Đăng Ký</Button>
        </div>
      </div>
    </DialogBody>
  </Form>
</template>

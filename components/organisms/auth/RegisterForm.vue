<script setup lang="ts">
import type { SubmissionContext } from "vee-validate";

type IRegisterForm = IRegisterBody;

const emits = defineEmits(["open-login", "succeed"]);
const { registerUser, isRegisterProcessing, registerValidationSchema } = useRegister();

const onSubmit = async (registerFormValue: IRegisterForm, ctx: SubmissionContext<IRegisterForm>) => {
  const registerBody: IRegisterBody = {
    ...registerFormValue,
    phone: registerFormValue.phone.replace(/\D/g, ""), // remove NOT digit character
  };

  const { isSucceeded, isUsernameExist } = await registerUser(registerBody);

  if (isUsernameExist) {
    ctx.setFieldError("username", "Người dùng đã tồn tại!");
    return;
  }

  if (isSucceeded && useDevice().isMobileOrTablet) {
    window.scrollTo({
      top: -100,
      behavior: "smooth",
    });
  }

  if (isSucceeded) emits("succeed");
};

onMounted(() => {
  autoFocusForm("#registerForm");
});
</script>

<template>
  <Form v-slot="{ handleSubmit }" as="" keep-values :validation-schema="registerValidationSchema">
    <DialogHeader>
      <DialogTitle>Tạo tài khoản</DialogTitle>
    </DialogHeader>

    <DialogBody>
      <form id="registerForm" @submit.prevent="handleSubmit($event, onSubmit as any)">
        <!-- Tạm thời disable flow Đăng ký nhanh -->
        <!-- <Button type="submit" form="dialogForm" class="mt-2 h-12 w-full">
            <Image src="quick-register.webp" width="32px" height="32px" />
            Đăng ký nhanh
          </Button>
          <div class="py-3 text-center text-sm font-normal text-primary">Hoặc nhập thông tin</div> -->
        <div class="flex flex-col gap-3">
          <FormField v-slot="{ componentField, value }" name="username">
            <FormItem>
              <FormLabel class="text-label">Tên đăng nhập</FormLabel>
              <FormControl>
                <InputText :name="componentField.name" :max-length="validate.username.max" :has-clear-btn="!!value" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="password">
            <FormItem>
              <FormLabel>Mật Khẩu</FormLabel>
              <FormControl>
                <InputText :name="componentField.name" type="password" :max-length="validate.password.max" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField, value }" name="phone">
            <FormItem>
              <FormLabel>Số điện thoại</FormLabel>
              <FormControl>
                <InputText
                  :name="componentField.name"
                  type="number"
                  :max-length="validate.phone.length"
                  :has-clear-btn="!!value"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
      </form>

      <div>
        <Button type="submit" form="registerForm" class="h-12 w-full" :disabled="isRegisterProcessing" size="lg">
          Đăng ký
        </Button>
        <div class="flex items-center justify-center gap-1 pt-3 text-sm">
          <h3 class="text-primary">Bạn đã có tài khoản?</h3>
          <Button variant="link" class="p-0 text-primary-300" @click="emits('open-login')">Đăng nhập</Button>
        </div>
      </div>
    </DialogBody>
  </Form>
</template>

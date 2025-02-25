<script lang="ts" setup>
defineProps({
  phone: {
    type: String,
    default: undefined,
  },
});

const emits = defineEmits(["get-otp"]);
</script>
<template>
  <div class="flex flex-col gap-4">
    <div class="sm:m-0">
      <p class="font-nunito leading-6 text-text-primary">OTP sẽ gửi về số điện thoại mà bạn đăng ký</p>
      <p v-if="phone" class="font-nunito text-xl font-semibold leading-7 text-text-money">
        {{ formatPhoneNumber(phone) }}
      </p>
    </div>
    <div class="flex gap-3">
      <DialogClose as-child>
        <Button class="h-10 w-full py-2" variant="outline"><p>Đổi Số Mới</p></Button>
      </DialogClose>
      <Button class="h-10 w-full p-2" variant="secondary" @click="emits('get-otp')">Lấy Mã OTP</Button>
    </div>
  </div>
</template>

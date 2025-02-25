<script lang="ts" setup>
const props = defineProps<{
  controller: IUseDialog;
  phone: string;
}>();

const currentStep = ref<number>(0);

const otp = ref<string[]>(Array(6).fill(""));
const remainOtpTime = ref<number>(0);
const isExpiredOtp = ref<boolean>(false);

const { sendOtp, verifyOtp } = useOtp();

const handleInput = (event: Event, index: number) => {
  const input = event.target as HTMLInputElement;
  otp.value[index] = input.value.replace(/[^0-9]/g, "").slice(-1);

  if (input.value.length === 1 && index < otp.value.length - 1) {
    const nextInput = input.nextElementSibling as HTMLInputElement;
    if (nextInput) {
      nextInput.focus();
    }
  }
};

// Handle key down for both desktop and mobile
const handleKeydown = (event: KeyboardEvent, index: number) => {
  const input = event.target as HTMLInputElement;
  const key = event.key;

  // check key !== 'v' to prevent paste event
  if (!/^[0-9]$/.test(key) && key !== "Backspace" && key !== "Delete" && key !== "v" && !event.metaKey) {
    event.preventDefault(); // Block non-numeric input
  }

  if ((key === "Backspace" || key === "Delete") && index > 0) {
    if (input.value.length === 0 && index > 0) {
      const prevInput = input.previousElementSibling as HTMLInputElement;
      if (prevInput) {
        prevInput.focus();
        prevInput.value = "";
        otp.value[index - 1] = "";
      }
    } else {
      otp.value[index] = "";
      input.value = "";
    }
  }
};

const handlePaste = (event: ClipboardEvent) => {
  const pasteData = event.clipboardData?.getData("text") || "";
  const sanitizedData = pasteData.replace(/[^0-9]/g, "").slice(0, 6);

  sanitizedData.split("").forEach((char, index) => {
    if (index < otp.value.length) {
      otp.value[index] = char;
    }
  });

  // Move focus to the next empty input
  const nextInput = document.querySelector(`#otp input:nth-child(${sanitizedData.length + 1})`) as HTMLInputElement;
  if (nextInput) {
    nextInput.focus();
  }
};

const countdownInterval = ref<ReturnType<typeof setInterval>>();

const startCountdown = () => {
  if (countdownInterval.value) {
    clearInterval(countdownInterval.value);
  }

  countdownInterval.value = setInterval(() => {
    if (remainOtpTime.value > 0) {
      remainOtpTime.value--;
    } else {
      isExpiredOtp.value = true;
      clearInterval(countdownInterval.value);
    }
  }, 1000);
};

const sendOtpHandler = async () => {
  const { remainTime } = await sendOtp();

  if (remainTime) {
    remainOtpTime.value = Math.floor((new Date(remainTime).getTime() - new Date().getTime()) / 1000);
    isExpiredOtp.value = false;
    startCountdown();
  }
};

const onSendOtp = async () => {
  await sendOtpHandler();
  currentStep.value++;
};

const onVerifyOpt = async () => {
  const { isSucceeded } = await verifyOtp(otp.value.join(""));
  if (isSucceeded) {
    props.controller?.closeDialog();
  }
};
</script>
<template>
  <Dialog :controller="controller" :type="DialogTypeEnum.VERIFY_PHONE">
    <DialogTrigger as-child>
      <slot name="trigger" />
    </DialogTrigger>
    <DialogContent class="top-1/3">
      <DialogHeader>
        <DialogTitle class="text-primary">Xác Thực Số Điện Thoại</DialogTitle>
      </DialogHeader>

      <DialogBody class="gap-0 text-center text-sm lg:py-5">
        <VerifyCurrentPhoneStep v-if="currentStep === 0" :phone="phone" @get-otp="onSendOtp" />
        <template v-if="currentStep === 1">
          <div class="flex flex-col gap-4">
            <p class="m-auto font-nunito leading-6 text-text-primary sm:w-3/4">
              OTP gồm 6 chữ số vừa được gửi đến số điện thoại
              <span class="text-text-money">{{ formatPhoneNumber(phone) }}</span>
            </p>

            <div>
              <div id="otp" class="flex justify-center gap-1">
                <Input
                  v-for="(_, index) in otp"
                  :key="index"
                  v-model="otp[index]"
                  type="text"
                  maxlength="1"
                  class="h-8 w-6 rounded border p-0 text-center before:w-4"
                  @input="handleInput($event, index)"
                  @keydown="handleKeydown($event, index)"
                  @paste="handlePaste"
                />
              </div>
              <div class="mt-2 h-5 text-text-error-primary">
                <p v-if="isExpiredOtp">Mã OTP đã hết hạn, vui lòng yêu cầu mã mới</p>
              </div>
            </div>

            <div class="flex gap-3">
              <Button
                class="h-10 w-full font-bold leading-3"
                variant="secondary"
                :disabled="otp.join('').length < 6"
                @click="onVerifyOpt"
                >Xác thực</Button
              >
            </div>

            <p v-if="!isExpiredOtp" class="text-neutral-100">
              OTP sẽ hết hạn trong <strong>{{ remainOtpTime }}</strong
              >s
            </p>
            <Button v-else variant="link" class="p-0 text-primary-300 hover:text-primary-300" @click="sendOtpHandler"
              >Gửi lại OTP</Button
            >
          </div>
        </template>
      </DialogBody>
    </DialogContent>
  </Dialog>
</template>

<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { Primitive, type PrimitiveProps } from "radix-vue";

type IProps = PrimitiveProps & {
  class?: HTMLAttributes["class"];
};

const props = withDefaults(defineProps<IProps>(), {
  as: "div",
});
</script>

<template>
  <Primitive :as="as" :class="cn('mt-5 flex items-center justify-end gap-4', props.class)">
    <div class="h-[80px] w-[400px] rounded-[8px] border-2 border-border-warning bg-background-bg-section_main p-4 px-3">
      <p class="mb-[1px] -translate-y-1 text-center text-xl font-semibold text-warning">
        Chuyển tiền tới tài khoản bên cạnh
      </p>
      <p class="text-center text-xs font-normal leading-4 text-warning">
        Lệnh nạp của bạn sẽ được xử lý tự động trong 3 phút.
      </p>
    </div>
    <div class="flex">
      <Image src="account/animation-arrow.webp" alt="arrow" class="flex-1 animate-fade-in-out" height="41px" />
      <div class="translate-x-[-3px]">
        <Image
          src="account/animation-arrow.webp"
          alt="arrow"
          class="flex-1 animate-fade-in-out-delayed object-contain delay-1000"
          height="41px"
        />
      </div>
    </div>
  </Primitive>
</template>

<style lang="scss" scoped></style>

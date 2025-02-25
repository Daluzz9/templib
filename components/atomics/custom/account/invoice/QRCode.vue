<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Primitive, type PrimitiveProps } from "radix-vue";

type IProps = PrimitiveProps & {
  imgUrl: string;
  class?: HTMLAttributes["class"];
  hasDownloadButton?: boolean;
  hasRefreshButton?: boolean;
  note?: string;
};

const props = withDefaults(defineProps<IProps>(), {
  as: "div",
  hasDownloadButton: true,
  hasRefreshButton: false,
});

const emit = defineEmits(["refresh"]);
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="cn('flex flex-col items-center gap-3', props.class)">
    <div id="wrapper-invoice-qrcode" class="overflow-hidden rounded-lg bg-white p-2">
      <div class="h-[152px] w-[152px]">
        <Image
          v-if="imgUrl"
          id="invoice-qrcode"
          :src="imgUrl"
          alt="Mã QR chỉ sử dụng 01 lần"
          width="152px"
          height="152px"
          :preload="true"
          :show-placeholder="false"
          img-class="object-contain"
        />
      </div>
      <p v-if="note" id="invoice-note" class="text-nowrap rounded-lg text-center text-xs text-black">
        {{ note }}
      </p>
    </div>
    <div class="flex items-center justify-center gap-2">
      <Button
        v-if="hasDownloadButton"
        variant="dark"
        class="h-8 w-[82px] bg-neutral-600 text-xs font-normal lg:h-9 lg:w-[92px] lg:text-sm lg:font-semibold"
        @click="downloadQRCodeByElementId('wrapper-invoice-qrcode', 'invoice-qrcode', 'invoice-note')"
      >
        Tải mã QR
      </Button>
      <Button
        v-if="hasRefreshButton"
        variant="dark"
        class="h-8 w-[82px] bg-neutral-600 text-xs font-normal lg:h-9 lg:w-[92px] lg:text-sm lg:font-semibold"
        @click="emit('refresh')"
      >
        Đổi mã QR
      </Button>
    </div>
  </Primitive>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Primitive, type PrimitiveProps } from "radix-vue";

type IProps = PrimitiveProps & {
  class?: HTMLAttributes["class"];
  title: string;
  info: IInvoiceField[];
  imgUrl: string;
  note: string;
  hasRefreshButton?: boolean;
  invoiceId?: string | number;
  qrCodeNote?: string;
};

const props = withDefaults(defineProps<IProps>(), {
  as: "div",
  hasRefreshButton: false,
});

const emit = defineEmits(["refresh-invoice"]);
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="props.class">
    <div class="mb-2 flex flex-row items-center justify-between gap-2">
      <p class="text-sm font-semibold text-text-primary lg:text-base lg:leading-[22px]">{{ title }}</p>
      <slot name="timer" />
    </div>
    <div class="rounded-lg py-2 max-lg:bg-background-bg-secondary max-lg:px-2">
      <p v-if="invoiceId" class="mb-3 text-center text-sm font-normal text-text-primary">
        Mã giao dịch <span class="text-base font-semibold text-primary-300">#{{ invoiceId }}</span>
      </p>
      <QRCode
        :img-url="imgUrl"
        class="mb-4"
        :has-refresh-button="hasRefreshButton"
        :note="qrCodeNote"
        @refresh="emit('refresh-invoice')"
      />
      <InvoiceInfo :info="info" class="flex flex-col gap-3" />
    </div>
    <p class="mb-5 text-xs font-normal text-warning max-lg:mt-2 lg:pl-2 lg:text-sm">{{ note }}</p>
    <slot name="action">
      <PaymentGatewayList class="mt-5" />
    </slot>
  </Primitive>
</template>

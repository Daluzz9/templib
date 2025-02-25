<script setup lang="ts">
import { NuxtLink } from "#components";
import { PaymentMethodStatusEnum } from "~/components/atomics/custom/account/payment-method";

const { eWalletMethods } = useAccountMenuDeposit();

const route = useRoute();

type IProps = {
  class?: string;
};

const props = defineProps<IProps>();

const getMethodStatus = (method: IPaymentMethod) => {
  if (method.isUnderMaintenance) {
    return PaymentMethodStatusEnum.MAINTENANCE;
  }
  if (route.query.type === method.type) {
    return PaymentMethodStatusEnum.ACTIVE;
  }
  return PaymentMethodStatusEnum.DEFAULT;
};
</script>

<template>
  <div :class="cn('flex items-center gap-4', props.class)">
    <PaymentMethod
      v-for="method in eWalletMethods"
      :key="method.type"
      class="group h-10 w-[180px] hover:border-tab-payment-borderActive hover:bg-tab-payment-bgActive"
      :name="method.name"
      :is-under-maintenance="method.isUnderMaintenance"
      :navigate-to="method.url"
      :as="NuxtLink"
      :status="getMethodStatus(method)"
    >
      <Image
        :src="method.img"
        alt="logo"
        width="24px"
        height="24px"
        :preload="true"
        img-class="object-contain"
        :style="method.isUnderMaintenance && { filter: 'brightness(2)', mixBlendMode: 'luminosity' }"
      />
    </PaymentMethod>
  </div>
</template>

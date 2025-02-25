import { cva } from "class-variance-authority";

export enum PaymentMethodStatusEnum {
  DEFAULT = "default",
  ACTIVE = "active",
  MAINTENANCE = "maintenance",
}

export const paymentMethodVariants = cva(
  "relative flex items-center justify-center gap-2 rounded-lg border border-solid",
  {
    variants: {
      status: {
        [PaymentMethodStatusEnum.ACTIVE]: "border-tab-payment-borderActive bg-tab-payment-bgActive",
        [PaymentMethodStatusEnum.MAINTENANCE]: "bg-tab-payment-bgDisabled pointer-events-none border-none",
        [PaymentMethodStatusEnum.DEFAULT]: "border-tab-payment-borderInactive bg-tab-payment-bgInactive",
      },
    },
    defaultVariants: {
      status: PaymentMethodStatusEnum.DEFAULT,
    },
  },
);

export const paymentMethodNameVariants = cva("text-sm font-semibold group-hover:text-tab-payment-fgActive", {
  variants: {
    status: {
      [PaymentMethodStatusEnum.ACTIVE]: "text-tab-payment-fgActive",
      [PaymentMethodStatusEnum.MAINTENANCE]: "text-tab-payment-fgDisabled",
      [PaymentMethodStatusEnum.DEFAULT]: "text-tab-payment-fgInactive",
    },
  },
  defaultVariants: {
    status: PaymentMethodStatusEnum.DEFAULT,
  },
});

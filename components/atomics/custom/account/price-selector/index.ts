import { cva } from "class-variance-authority";

export const priceSelectorVariants = cva("relative flex items-center justify-center border rounded-lg cursor-pointer", {
  variants: {
    status: {
      [PriceSelectorStatusEnum.ACTIVE]: "border-tab-payment-borderActive bg-tab-money-bgActive",
      [PriceSelectorStatusEnum.DEFAULT]: "border-tab-payment-borderInactive bg-tab-money-bgInactive",
    },
  },
  defaultVariants: {
    status: PriceSelectorStatusEnum.DEFAULT,
  },
});

export const amountVariants = cva("text-sm group-hover:text-tab-mainMenu-fgActive group-hover:font-semibold", {
  variants: {
    status: {
      [PriceSelectorStatusEnum.ACTIVE]: "font-semibold text-tab-mainMenu-fgActive",
      [PriceSelectorStatusEnum.DEFAULT]: "text-tab-money-fgActive",
    },
  },
  defaultVariants: {
    status: PriceSelectorStatusEnum.DEFAULT,
  },
});

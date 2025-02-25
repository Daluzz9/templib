import { cva, type VariantProps } from "class-variance-authority";

export const bonusRowVariants = cva("flex items-center", {
  variants: {
    textSize: {
      default: "text-base",
      sm: "text-sm",
    },
  },
  defaultVariants: {
    textSize: "default",
  },
});

export type IBonusRowVariants = VariantProps<typeof bonusRowVariants>;

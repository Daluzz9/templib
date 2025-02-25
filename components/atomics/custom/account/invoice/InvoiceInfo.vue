<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Primitive, type PrimitiveProps, TooltipArrow, TooltipPortal, TooltipRoot } from "radix-vue";

type IProps = PrimitiveProps & {
  class?: HTMLAttributes["class"];
  info: IInvoiceField[];
};

type IInvoiceFieldWithTooltip = IInvoiceField & {
  tooltip: {
    content: string;
    active: boolean;
    isHovered: boolean;
  };
};

const { $device } = useNuxtApp();

const props = withDefaults(defineProps<IProps>(), {
  as: "div",
});

const getInitInvoiceInfo = () => {
  return props.info.map((item) => ({
    ...item,
    tooltip: {
      content: "Nhấn để Copy",
      active: false,
      isHovered: false,
    },
  }));
};

const invoicesInfo = ref<IInvoiceFieldWithTooltip[]>(getInitInvoiceInfo());

const { isPending, start, stop } = useTimeoutFn(
  () => {
    resetTooltip();
  },
  3000,
  { immediate: false },
);

const setContentTooltip = (value: string | number) => {
  stop();
  resetTooltip();

  const idx = invoicesInfo.value.findIndex((item) => item.value === value);
  invoicesInfo.value[idx].tooltip.active = true;
  invoicesInfo.value[idx].tooltip.content = "Đã Copy";

  if (!isPending.value) {
    start();
  }
};

const resetTooltip = () => {
  invoicesInfo.value
    .filter((item) => item.tooltip.active)
    .forEach((item) => {
      item.tooltip.active = false;
      item.tooltip.content = $device.isDesktop ? "Nhấn để Copy" : "Đã Copy"; // the content tooltip only has "Đã Copy" on mobile
    });
};

watch(
  () => props.info,
  () => {
    invoicesInfo.value = getInitInvoiceInfo();
  },
  { deep: true },
);
</script>

<template>
  <Primitive :as="as" :class="props.class">
    <div
      v-for="({ label, value, isCopy, tooltip }, index) in invoicesInfo"
      :key="value"
      :class="
        cn('flex items-center justify-between px-2', {
          'h-[34px] rounded-lg bg-custom-gradient-6 py-[6px]': index === info.length - 1,
        })
      "
    >
      <div class="text-sm text-text-secondary">
        {{ label }}
        <span v-if="index === info.length - 1" class="text-warning">*</span>
      </div>
      <div class="flex items-center justify-center gap-1">
        <span
          :class="
            cn('text-sm font-semibold text-primary lg:text-base lg:leading-[22px]', {
              'text-primary-300': index === info.length - 1,
            })
          "
        >
          {{ value }}
        </span>

        <!-- Show Tooltip -->
        <TooltipProvider :disable-closing-trigger="true" :delay-duration="200">
          <TooltipRoot :delay-duration="200" :open="tooltip.active || tooltip.isHovered">
            <TooltipTrigger as-child>
              <ButtonCopy
                v-if="isCopy"
                :copy-text="value.toString()"
                :class-icon-copy="tooltip.active ? 'text-disable' : ''"
                @copy="setContentTooltip(value)"
                @mouseover="tooltip.isHovered = true && $device.isDesktop"
                @mouseleave="tooltip.isHovered = false && $device.isDesktop"
              />
            </TooltipTrigger>

            <TooltipPortal>
              <TooltipContent
                class="z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-sm text-neutral-600 text-primary-foreground animate-in fade-in-0 zoom-in-95"
                side="top"
                :side-offset="5"
                :align="'end'"
              >
                <span class="text-sm font-normal text-neutral-600">{{ tooltip.content }}</span>
                <TooltipArrow class="fill-white" :width="8" />
              </TooltipContent>
            </TooltipPortal>
          </TooltipRoot>
        </TooltipProvider>
      </div>
    </div>
  </Primitive>
</template>

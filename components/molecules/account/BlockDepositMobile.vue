<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { Primitive, type PrimitiveProps } from "radix-vue";

type IProps = PrimitiveProps & {
  class?: HTMLAttributes["class"];
  plan: ISystemPlan;
  showButton?: boolean;
};

const props = withDefaults(defineProps<IProps>(), {
  as: "div",
  showButton: true,
});

const emit = defineEmits(["cancel-promotion"]);
</script>

<template>
  <Primitive
    :as="as"
    :class="
      cn(
        'fixed left-0 top-12 z-100 flex h-full w-full items-center justify-center bg-background-popup-backdrop p-4',
        props.class,
      )
    "
  >
    <div
      class="relative -top-32 w-full overflow-hidden rounded-lg border border-border-warning bg-background-bg-section_main px-4 py-3"
    >
      <div :class="{ 'mb-4': showButton }">
        <div class="mb-1 self-stretch text-base font-semibold leading-snug text-warning">
          Bạn đang tham gia {{ plan?.name }}
        </div>
        <div class="self-stretch text-sm font-normal">
          <slot name="rolling" :plan="plan" />
        </div>
      </div>
      <div
        v-if="showButton"
        class="flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg px-4 py-2"
      >
        <Button variant="secondary" class="h-12 w-[153px] text-base font-bold" @click="emit('cancel-promotion')"
          >Huỷ khuyến mãi</Button
        >
      </div>
    </div>
  </Primitive>
</template>

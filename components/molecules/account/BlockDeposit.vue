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
    :class="cn('flex h-[90px] flex-col items-center gap-2 rounded-lg bg-background-bg-secondary', props.class)"
  >
    <div
      class="inline-flex h-full w-full items-center justify-start gap-1 overflow-hidden rounded-lg border border-border-warning bg-background-bg-section_main px-4 py-3"
    >
      <div class="inline-flex shrink grow basis-0 flex-col items-start justify-start gap-1">
        <div class="self-stretch text-base font-semibold leading-snug text-warning">
          Bạn đang tham gia {{ plan?.name }}
        </div>
        <div class="self-stretch">
          <slot name="rolling" :plan="plan" />
        </div>
      </div>
      <div v-if="showButton" class="flex items-center justify-center gap-2 overflow-hidden">
        <Button
          variant="secondary"
          size="lg"
          class="w-[135px] text-center text-sm font-semibold"
          @click="emit('cancel-promotion')"
        >
          Huỷ khuyến mãi
        </Button>
      </div>
    </div>
  </Primitive>
</template>

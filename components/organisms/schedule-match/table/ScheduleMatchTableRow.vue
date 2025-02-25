<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { Primitive, type PrimitiveProps } from "radix-vue";

type IProps = PrimitiveProps & {
  class?: HTMLAttributes["class"];
  rowId?: string;
  expandedRowId?: string;
};

const props = withDefaults(defineProps<IProps>(), {
  as: "div",
  rowId: "",
  expandedRowId: "",
});

defineEmits(["click"]);
</script>

<template>
  <Primitive
    :as="as"
    :class="
      cn(
        'grid-row group/row col-span-full grid grid-cols-inherit items-center gap-x-inherit gap-y-1 border-b border-white/10 py-2 last:border-0 data-[state=expanded]:bg-white/10',
        props.class,
      )
    "
    :data-state="props.rowId && props.rowId === expandedRowId ? 'expanded' : ''"
    @click="$emit('click', props.rowId)"
  >
    <slot :row-id="props.rowId" />
  </Primitive>
</template>

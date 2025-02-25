<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Primitive, type PrimitiveProps } from "radix-vue";

type IProps = PrimitiveProps & {
  guideList: IGuide[];
  isGuideRow?: boolean;
  class?: HTMLAttributes["class"];
};

const props = withDefaults(defineProps<IProps>(), {
  as: "div",
  isGuideRow: false,
});
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="props.class">
    <div :class="cn('flex flex-col', { 'flex-row items-center justify-between': isGuideRow })">
      <template v-for="(guide, index) in guideList" :key="guide.icon">
        <GuideItem :guide="guide" :class="cn('text-text-secondary', { 'gap-[6px] text-text-primary': isGuideRow })" />
        <div
          v-if="index < guideList.length - 1"
          :class="cn('h-6 w-0 border-[1.5px] border-dashed border-border-primary', { 'ml-[15.25px]': !isGuideRow })"
        />
      </template>
    </div>
  </Primitive>
</template>

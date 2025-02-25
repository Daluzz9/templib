<script lang="ts" setup>
import type { HTMLAttributes } from "vue";

type IProps = {
  class?: HTMLAttributes["class"];
};

const props = withDefaults(defineProps<IProps>(), {});
</script>

<template>
  <div class="absolute h-full w-full bg-[#151724] lg:bg-[#171921]">
    <div
      :class="
        cn(
          'absolute flex h-full max-h-[446px] w-full flex-col items-center justify-center lg:max-h-[692px]',
          'bg-[url(/images/sport/loading-background-mb.webp)] bg-contain bg-center bg-no-repeat lg:bg-[url(/images/sport/loading-background.webp)]',
          props.class,
        )
      "
    >
      <Image
        src="sport/loading-thumb.webp"
        img-class="lg:h-[546px] h-[340px]"
        :show-placeholder="false"
        :has-animation="false"
      />
      <Image
        src="logo.webp"
        class="-mt-4 overflow-visible lg:-mt-9"
        img-class="lg:h-[37px]"
        :show-placeholder="false"
        :has-animation="false"
      />
      <div class="mt-3.5 font-nunito text-sm font-normal text-neutral-100 lg:mt-4 lg:text-base">
        Đang tải, vui lòng đợi <span class="hidden lg:inline">trong</span> giây lát...
      </div>
    </div>
  </div>
</template>

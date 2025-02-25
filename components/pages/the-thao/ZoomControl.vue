<script setup lang="ts">
const { isZoom, onZoom, onClose } = useIframe();
</script>

<template>
  <div class="absolute right-0">
    <p
      class="group absolute right-0 top-11 flex w-10 cursor-pointer items-center whitespace-nowrap rounded-l-[20px] bg-neutral-400 p-[8px_9px] transition-all duration-300 hover:w-[101px]"
      @click="onZoom"
    >
      <Image src="expand.webp" alt="zoom" class="mr-3 flex-shrink-0 group-hover:mr-2" height="21px" width="21px" />
      <span class="text-sm font-medium leading-5 text-white">
        {{ isZoom ? "Thu nhỏ" : "Phóng to" }}
      </span>
    </p>

    <p
      class="group absolute right-0 top-[90px] flex w-10 cursor-pointer items-center whitespace-nowrap rounded-l-[20px] bg-neutral-400 p-[8px_9px] transition-all duration-300 hover:w-[101px]"
      @click="onClose"
    >
      <Image src="close.webp" alt="close" class="mr-3 flex-shrink-0 group-hover:mr-2" height="21px" width="21px" />
      <span class="text-sm font-medium leading-5 text-white">Thoát</span>
    </p>
  </div>
</template>

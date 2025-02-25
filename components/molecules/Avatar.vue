<script setup lang="ts">
const device = useDevice();
const isDesktop = device.isDesktop;

const props = defineProps({
  class: {
    type: String,
  },
  avatarImg: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <div :class="cn('relative h-10 w-10', props.class)">
    <Image
      :src="avatarImg"
      :width="isDesktop ? '40px' : '34.5px'"
      :height="isDesktop ? '40px' : '34.5px'"
      class="absolute z-10 rounded-full"
      alt="avatar"
    />
    <Image
      src="hamburger.webp"
      width="16px"
      height="16px"
      class="absolute bottom-0 right-0 z-20"
      :preload="true"
      alt="hamburger"
    />
  </div>
</template>

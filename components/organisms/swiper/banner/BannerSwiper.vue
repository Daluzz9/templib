<script setup lang="ts">
import { SwiperSlide } from "swiper/vue";

defineProps<{
  banners: IBanner[];
}>();

const emits = defineEmits<{
  (e: "select", banner: IBanner): void;
}>();
const device = useDevice();

const isDesktop = device.isDesktop;
</script>

<template>
  <Swiper
    :show-navigation="isDesktop"
    :pagination="!isDesktop && { clickable: true }"
    :class="['max-h-[280px] w-full', isDesktop ? 'aspect-[1440/280]' : 'aspect-[375/116]']"
    :options="{ autoplay: true }"
  >
    <SwiperSlide v-for="banner in banners" :key="banner.name">
      <button class="h-full w-full" @click="emits('select', banner)">
        <Image :src="banner.img" loading="eager" height="100%" :alt="banner.name" />
      </button>
    </SwiperSlide>
  </Swiper>
</template>

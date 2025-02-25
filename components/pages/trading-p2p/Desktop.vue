<script setup lang="ts">
const { isLoading, srcIframe } = useTradingP2P();
const iframe = ref<HTMLIFrameElement | null>(null);
</script>

<template>
  <div class="w-full">
    <LoadingSpinner
      v-if="isLoading"
      class="flex min-h-[666px] items-center justify-center rounded-[3px] bg-background-bg-section_main"
    />

    <div v-show="!isLoading" class="relative w-full">
      <div class="z-[1] flex min-h-[666px] w-full rounded-[8px] bg-[#1f2b49] bg-contain">
        <iframe
          id="iframe"
          ref="iframe"
          :src="srcIframe"
          allow="camera *; geolocation *; microphone *; autoplay *; clipboard-read *; clipboard-write *"
          frame-id="my-iframe"
          name="my-frame"
          class="mt-0 min-h-screen w-full rounded-[8px] border-none"
          @load="() => (isLoading = false)"
        />
      </div>
    </div>
  </div>
</template>

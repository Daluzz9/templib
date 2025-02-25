<script setup lang="ts">
import ZoomInOut from "./ZoomControl.vue";
const route = useRoute();
const { onLoadIframe } = useIframe();
const { getSportUrlProvider } = useSport();

const iframeRef = ref<HTMLIFrameElement | undefined>(undefined);
const src = ref<string>("");
const isLoading = ref<boolean>(false);
const isFullScreen = ref<boolean>(false);
const sportProviderResponse = ref<ISportUrlProvider | undefined>(undefined);

const handleClickZoom = () => {
  isFullScreen.value = !isFullScreen.value;
};

onMounted(async () => {
  isLoading.value = true;
  try {
    const response = await getSportUrlProvider(
      (route.params.provider as SportProvidersEnum) ?? route.name,
      route.query,
    );
    sportProviderResponse.value = response;
  } catch {
    // TODO Meidai: update using logger service in not expected error case
  } finally {
    isLoading.value = false;
  }
});

watchEffect(() => {
  if (!sportProviderResponse.value) return;
  const data = sportProviderResponse.value;

  if (data?.maintenance) {
    navigateTo(APP_PATH.MAINTENANCE);
  } else if (!data?.url || data?.url.includes("undefined")) {
    navigateTo(APP_PATH.HOME);
  } else if (useDevice().isMobileOrTablet) {
    navigateTo(data.url, { external: true });
  } else {
    src.value = data.url;
  }
});
</script>

<template>
  <div ref="iframe-section" class="relative w-full overflow-hidden">
    <div class="wrapper-iframe z-10 min-h-[calc(100vh-72px)] w-full bg-contain bg-center bg-no-repeat">
      <LoadingSport v-if="isLoading" />
      <div v-else>
        <ZoomInOut @click="handleClickZoom" />

        <iframe
          id="iframe"
          ref="iframe"
          :src="src"
          allow="camera *; geolocation *; microphone *; autoplay *"
          frame-id="my-iframe"
          name="my-frame"
          class="vue-iframe min-h-[calc(100vh-72px)] w-full border-none"
          @load="onLoadIframe(iframeRef)"
        />
      </div>
    </div>
  </div>
</template>

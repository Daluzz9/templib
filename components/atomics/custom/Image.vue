<script setup lang="ts">
import type { PrimitiveProps } from "radix-vue";
import type { ComponentPublicInstance, HTMLAttributes } from "vue";

type IProps = PrimitiveProps & {
  class?: string;
  imgClass?: HTMLAttributes["class"];
  placeholderClass?: string;
  overlayClass?: string;
  src: string;
  alt?: string;
  preload?: boolean;
  loading?: "lazy" | "eager";
  width?: string;
  height?: string;
  densities?: string;
  showSpinner?: boolean;
  showPlaceholder?: boolean;
  showOverlay?: boolean;
  usePadding?: boolean;
  effect?: "mirror";
  provider?: string;
  placeholderSrc?: string;
  errorSrc?: string;
  selfHost?: boolean;
  hasAnimation?: boolean; // undefined = animation for first load
};

const props = withDefaults(defineProps<IProps>(), {
  preload: false,
  loading: "lazy",
  width: "auto",
  height: "auto",
  showPlaceholder: true,
  showSpinner: false,
  showOverlay: false,
  usePadding: false,
  alt: "",
  placeholderSrc: undefined,
  errorSrc: "error-img.webp",
  selfHost: false,
  hasAnimation: false,
});

const IMAGE_DIR = "images";
const { $config } = useNuxtApp();

const imageRef = ref<ComponentPublicInstance>();

const isLoaded = ref(false);
const isDisplayingPlaceholder = ref(props.showPlaceholder);

const handleLoaded = () => {
  isLoaded.value = true;
  setTimeout(() => {
    isDisplayingPlaceholder.value = false;
  }, 100);
};

const hasError = ref(false);
const handleError = () => {
  isLoaded.value = true;
  hasError.value = true;
};

const customAlt = String(`${$config.public.BRAND_NAME} ${props.alt}`).trim();

const baseUrl = props.selfHost ? "" : $config.public.NUXT_APP_CDN_URL;

const fullPlaceholderSrc = props.placeholderSrc
  ? `${$config.public.NUXT_APP_CDN_URL}/${IMAGE_DIR}/${props.placeholderSrc}`
  : undefined;

const fullErrorSrc = `${$config.public.NUXT_APP_CDN_URL}/${IMAGE_DIR}/${props.errorSrc}`;

const fullImageSrc = computed(() => {
  if (props.src.startsWith("http") || props.src.startsWith("blob")) return props.src;
  const src = props.src.startsWith("/") ? props.src.substring(1) : props.src;
  return `${baseUrl}/${IMAGE_DIR}/${src}`;
});

const isCompletedOnMounted = ref<boolean>(false);

onMounted(() => {
  if (imageRef.value?.$el.complete && !isLoaded.value) {
    isLoaded.value = true;
    isDisplayingPlaceholder.value = false;
    isCompletedOnMounted.value = true;
  }
});
</script>

<template>
  <div
    :class="cn('group relative overflow-hidden', props.class, isLoaded && props.effect)"
    :style="{
      width,
      paddingBottom: usePadding ? height : 0,
      height: usePadding ? 0 : height,
    }"
  >
    <NuxtImg
      v-if="!hasError"
      ref="imageRef"
      :src="fullImageSrc"
      :class="
        cn(
          'z-image h-full w-full object-cover opacity-100 transition-opacity duration-300',
          usePadding ? 'absolute' : 'relative',
          { 'opacity-0': !isLoaded },
          { 'transition-none': isCompletedOnMounted || hasAnimation === false },
          { 'transition-opacity': hasAnimation === true },
          imgClass,
        )
      "
      :alt="customAlt"
      :preload="preload"
      :loading="loading"
      :densities="densities"
      :provider="provider"
      @load="handleLoaded"
      @error="handleError"
    />

    <slot v-if="isDisplayingPlaceholder" name="placeholder-content">
      <div
        :class="
          cn(
            'absolute inset-0 z-image-placeholder flex h-full w-full items-center justify-center bg-neutral-700',
            { 'animate-pulse': !hasError },
            placeholderClass,
          )
        "
      >
        <NuxtImg
          v-if="fullPlaceholderSrc"
          :src="fullPlaceholderSrc"
          alt="image-placeholder"
          width="103px"
          class="max-w-[70%]"
        />

        <NuxtImg
          v-if="hasError && fullErrorSrc"
          :src="fullErrorSrc"
          alt="image-error"
          width="40px"
          class="max-w-[70%]"
        />
      </div>
    </slot>

    <slot v-if="!isLoaded && showSpinner" name="spinner">
      <div class="absolute left-1/2 top-1/2 z-image-spinner -translate-x-1/2 -translate-y-1/2">
        <LoadingSpinner />
      </div>
    </slot>

    <div
      v-if="isLoaded && showOverlay"
      :class="
        cn(
          'image-spinner absolute inset-0 z-image-overlay flex scale-75 items-center justify-center bg-[#060606]/70 opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100',
          overlayClass,
        )
      "
    >
      <slot name="hovered-overlay" />
    </div>

    <slot name="sub" :is-loaded="isLoaded" />
  </div>
</template>

<style lang="scss" scoped>
@keyframes mirror {
  0% {
    left: -75%;
  }
  100% {
    left: 125%;
  }
}

.mirror {
  &::before {
    content: "";
    @apply invisible absolute top-0 z-image-overlay block h-full w-1/2 skew-x-[-25deg];
    background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.3) 100%);
  }

  &:hover::before {
    @apply visible;
    animation: mirror 0.8s forwards;
  }
}
</style>

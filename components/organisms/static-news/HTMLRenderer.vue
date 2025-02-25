<script setup lang="ts">
import type { HTMLAttributes } from "vue";

type IHtmlRendererProps = {
  htmlContent?: string;
  class?: HTMLAttributes["class"];
};

const props = defineProps<IHtmlRendererProps>();
</script>

<template>
  <!--  Handled sanitize HTML content-->
  <!-- eslint-disable-next-line vue/no-v-html -->
  <article :class="props.class" v-html="sanitizeHTMLContent(htmlContent)" />
</template>

<style lang="scss" scoped>
/* Common styles */
div,
:deep(p),
:deep(ul),
:deep(li) {
  @apply text-base font-normal text-text-secondary;
}

:deep(strong),
:deep(h1),
:deep(h2),
:deep(h3),
:deep(h4),
:deep(h5),
:deep(h6) {
  @apply text-base font-semibold text-text-primary;
}

:deep(img) {
  @apply m-auto flex items-center justify-center rounded-lg;
}

:deep(figure) {
  @apply block;
  figcaption {
    @apply text-center text-text-secondary;
  }
}

:deep(a) {
  @apply text-text-primary hover:underline;
}

/* Mobile styles */
@media (max-width: 767px) {
  div,
  :deep(p),
  :deep(ul),
  :deep(li) {
    @apply text-sm;
  }

  :deep(strong),
  :deep(h1),
  :deep(h2),
  :deep(h3),
  :deep(h4),
  :deep(h5),
  :deep(h6) {
    @apply mb-1 mt-2 text-sm font-bold;
  }

  :deep(img) {
    @apply my-4 rounded-s;
  }

  :deep(figure) {
    figcaption {
      @apply text-sm;
    }
  }
}
</style>

<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import type { IBreadcrumb } from "~/components/atomics/custom/breadcumb/type";

type IProps = {
  class?: HTMLAttributes["class"];
  title?: string;
  description?: string;
  datePublished?: string;
  titleClass?: HTMLAttributes["class"];
  breadcrumbs?: IBreadcrumb[];
};

const props = withDefaults(defineProps<IProps>(), {});

const datePublishedTimeParts = computed(() => (props.datePublished ? getDateTimeForNews(props.datePublished) : []));
const [hour, date] = datePublishedTimeParts.value;
</script>

<template>
  <div :class="cn('mb-3 md:mb-4', props.class)">
    <Breadcrumb v-if="breadcrumbs?.length" class="mb-4" :breadcrumbs="breadcrumbs ?? []" />
    <CardTitle as="h1" :class="cn('line-clamp-2 font-bold text-primary md:text-base md:text-primary', titleClass)">
      {{ title }}
    </CardTitle>
    <CardDescription as="h2" class="my-1 font-archivo">{{ description }}</CardDescription>
    <CardDatePublished v-if="datePublishedTimeParts.length">
      <span>{{ hour }}</span>
      <span>{{ date }}</span>
    </CardDatePublished>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<template>
  <div class="flex flex-row items-center justify-center">
    <SvgoStar class="text-[#F9A62E]" />
    <h3
      class="px-2 text-base font-bold uppercase leading-[22px] text-text-primary md:px-4 md:text-2xl md:leading-[24px]"
    >
      {{ title }}
    </h3>
    <SvgoStar class="text-[#F9A62E]" />
  </div>
</template>

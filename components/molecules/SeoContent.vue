<script setup lang="ts">
const props = defineProps({
  title: { type: String },
  description: { type: String },
});
</script>

<template>
  <div class="hidden" v-html="sanitizeHTMLContent(props.title)" />
  <div class="hidden" v-html="sanitizeHTMLContent(props.description)" />
</template>

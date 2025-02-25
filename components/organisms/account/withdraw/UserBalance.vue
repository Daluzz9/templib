<script setup lang="ts">
import type { HTMLAttributes } from "vue";

const { currentUser } = useCurrentUser();

type IProps = {
  class?: HTMLAttributes["class"];
};

const props = defineProps<IProps>();
</script>

<template>
  <div :class="cn('flex items-center justify-between bg-custom-gradient-7 px-4 py-2', props.class)">
    <p class="text-sm text-text-secondary">Số dư ví</p>
    <p class="text-sm text-text-money">{{ currentUser?.balance || 0 }} K</p>
  </div>
</template>

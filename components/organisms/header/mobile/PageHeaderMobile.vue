<script setup lang="ts">
import LoggedUser from "./logged-user.vue";
import NotLoggedUser from "./not-logged-user.vue";

defineProps({
  title: {
    type: String,
    required: true,
  },
  navigateTo: {
    type: String,
    default: "/",
  },
  showUserAuth: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["back"]);

const { currentUser } = useCurrentUser();
</script>
<template>
  <div
    class="relative z-200 grid h-[52px] w-full grid-flow-col grid-cols-[auto_1fr_auto] items-center gap-1 border-b border-border-primary bg-neutral-800 pl-[12px] pr-4 [touch-action:manipulation]"
  >
    <button @click="emit('back')">
      <Image src="back.svg" width="32px" height="32px" alt="back icon" />
    </button>
    <div class="text-base font-semibold text-white">{{ title }}</div>
    <div v-if="showUserAuth">
      <LoggedUser v-if="currentUser" />
      <NotLoggedUser v-else />
    </div>
    <NuxtLink v-else :to="navigateTo">
      <Image src="home.svg" width="24px" height="24px" alt="home icon" />
    </NuxtLink>
  </div>
</template>

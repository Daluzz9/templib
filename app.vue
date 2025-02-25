<script setup lang="ts">
// -- Use to detect user login with multiple tab when on same browser
// -- Use "pinia-plugin-persistedstate" to handle this flow
onBeforeUnmount(() => {
  window.removeEventListener("storage", onCurrentUserListening);
});

const onCurrentUserListening = () => {
  const { currentUser } = useCurrentUser();

  const userStore = localStorage.getItem("userStore");
  if (userStore !== null && userStore !== undefined) {
    if (!currentUser.value) {
      window.location.reload();
    }
  }
};

onMounted(() => {
  window.addEventListener("storage", onCurrentUserListening);
});
</script>

<template>
  <div class="relative flex min-h-dvh flex-col">
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <Toaster />
  </div>

  <AppDialog />
  <SideMenuSheet />
</template>

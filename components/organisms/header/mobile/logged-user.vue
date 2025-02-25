<script setup lang="ts">
const { currentUser } = useCurrentUser();
const { openSidebarMenu } = useSidebarMenu();
</script>

<template>
  <div v-if="currentUser" class="flex items-center justify-center gap-3">
    <div class="flex items-center justify-center gap-1 text-secondary-400">
      {{ currentUser?.balance }} <Image src="K.webp" width="18px" height="18px" />
    </div>
    <Button class="w-16" variant="secondary" @click="openSidebarMenu(SidebarMenuEnum.ACCOUNT_DEPOSIT)">Nạp</Button>
    <button @click="openSidebarMenu(SidebarMenuEnum.ACCOUNT_OVERVIEW)">
      <Avatar :avatar-img="currentUser.avatar ? `avatar/${currentUser.avatar}.webp` : `avatar/default-avatar.webp`" />
    </button>
  </div>
</template>

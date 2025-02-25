<template>
  <AccountOverviewLayout class="h-account w-full grid-cols-account-layout-v1">
    <template #left>
      <div class="rounded-lg bg-background-menu-account p-6">
        <AccountOverviewDesktop />
      </div>
    </template>
    <template #right>
      <div class="rounded-lg bg-background-menu-account p-6">
        <FormProfileInfoDesktop />
      </div>
    </template>
  </AccountOverviewLayout>
</template>

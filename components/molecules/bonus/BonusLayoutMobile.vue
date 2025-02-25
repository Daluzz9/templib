<template>
  <PageLayoutMobile>
    <template #header>
      <slot name="header" />
    </template>
    <template #main>
      <div class="flex min-h-[calc(100dvh_-_52px)] flex-col bg-neutral-750 p-4">
        <slot name="statistics" />
        <slot name="details" />
      </div>
    </template>
  </PageLayoutMobile>
</template>

<template>
  <div
    class="relative grid h-full grid-flow-row grid-cols-1 grid-rows-[auto_1fr_auto] gap-0 bg-background-menu-account"
  >
    <div class="sticky top-0 z-20">
      <slot name="header" />
    </div>
    <div class="relative h-full w-full overflow-y-auto">
      <slot name="main" />
    </div>
    <div class="sticky bottom-0 z-20">
      <slot name="bottom" />
    </div>
  </div>
</template>

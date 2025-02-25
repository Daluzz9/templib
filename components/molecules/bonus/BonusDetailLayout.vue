<template>
  <div class="pa flex flex-col px-6 pt-2">
    <div class="mb-2 text-base font-semibold text-primary">
      <slot name="title" />
    </div>
    <div class="grid grid-cols-[auto_1px_450px] gap-6">
      <slot name="left-content" />
      <div class="h-full border-r border-dashed border-neutral-600" />
      <slot name="right-content" />
    </div>
  </div>
</template>

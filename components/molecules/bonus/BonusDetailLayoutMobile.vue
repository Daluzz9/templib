<template>
  <div class="flex flex-col rounded-lg bg-background-bg-secondary px-[14px] py-4">
    <slot name="top-content" />
    <div class="my-2 h-[1px] w-full border-b border-dashed border-neutral-600" />
    <slot name="bottom-content" />
  </div>
</template>

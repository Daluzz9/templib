<template>
  <div>
    <div class="flex flex-row items-start justify-center gap-6 p-0 pb-4">
      <div class="w-[472px]">
        <slot name="highlight-left" />
      </div>
      <div class="flex-1">
        <slot name="highlight-right" />
      </div>
    </div>
    <div class="m-auto">
      <slot name="list" />
    </div>
  </div>
</template>

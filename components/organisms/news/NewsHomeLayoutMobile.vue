<template>
  <div class="h-full">
    <div class="flex justify-center p-0 pb-4">
      <div class="w-full">
        <slot name="highlight" />
      </div>
    </div>
    <div>
      <slot name="list" />
    </div>
  </div>
</template>

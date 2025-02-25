<template>
  <div class="relative m-auto min-h-[calc(100dvh-(372px+108px))] w-full max-w-[1344px] px-8 pt-6">
    <div class="text-2xl font-semibold text-text-primary">
      <slot name="title" />
    </div>
    <div class="py-4">
      <slot name="category" />
    </div>
    <div class="min-h-[500px] pb-6">
      <slot name="content" />
    </div>
  </div>
</template>

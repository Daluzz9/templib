<template>
  <div class="relative m-auto min-h-[calc(100dvh-(372px+108px))] w-full max-w-[1344px] px-8 py-6">
    <div class="pb-6">
      <slot name="breadcrumb" />
    </div>
    <div>
      <slot name="content" />
    </div>
  </div>
</template>

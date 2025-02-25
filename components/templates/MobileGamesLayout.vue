<template>
  <section class="grid h-full w-full grid-cols-1 gap-2">
    <BannerSwiper />

    <div class="flex overflow-hidden">
      <MobileSidebar class="flex-shrink-0" />

      <div class="container overflow-y-scroll">
        <div class="pb-4">
          <slot />
        </div>
      </div>
    </div>
  </section>
</template>

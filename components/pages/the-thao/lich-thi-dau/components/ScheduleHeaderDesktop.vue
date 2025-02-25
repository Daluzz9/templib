<script setup lang="ts">
import { TooltipArrow } from "radix-vue";
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-x-3">
      <Image src="/sport/sport-schedule/golden-ball.webp" width="24px" height="24px" alt="lich thi dau icon" />
      <h2 class="font-nunito text-2xl font-bold uppercase text-primary">Lịch thi dấu</h2>
    </div>
    <div class="flex items-center gap-x-3 font-nunito text-sm font-normal text-primary">
      <TooltipProvider :disable-closing-trigger="true" :delay-duration="100">
        <Tooltip>
          <TooltipTrigger>
            <div class="flex cursor-pointer items-center gap-x-1">
              <SvgoMatch class="rounded-full bg-secondary p-0.5 text-base" data-grace-area-trigger />
              Soi kèo
            </div>
          </TooltipTrigger>
          <TooltipContent
            side="bottom"
            :align="'start'"
            :align-offset="-80"
            class="ml-[50px] rounded-lg bg-secondary p-2"
          >
            <span class="text-sm text-black">Xem đội hình & diễn biến trận đấu trực tiếp</span>
            <TooltipArrow class="fill-secondary" :width="11" :height="8" />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider :disable-closing-trigger="true" :delay-duration="100">
        <Tooltip>
          <TooltipTrigger>
            <div class="cursor-pointer"><span class="text-[#8A9099]">(C)</span> Kèo chấp, Tỷ lệ kèo chấp đa dạng</div>
          </TooltipTrigger>
          <TooltipContent
            side="bottom"
            :align="'start'"
            :align-offset="-250"
            class="ml-[220px] rounded-lg bg-secondary p-2 text-black"
          >
            <div class="flex gap-x-2.5">
              <div class="flex flex-col gap-y-2 rounded-lg bg-[#292D30] p-2 text-sm font-semibold text-primary">
                <div class="flex items-center gap-x-2">
                  <Image src="/sport/sport-schedule/logo-mu.webp" width="24px" height="24px" class="flex-none" />
                  Man United (C)
                </div>
                <div class="flex items-center gap-x-2">
                  <Image src="/sport/sport-schedule/logo-mc.webp" width="24px" height="24px" class="flex-none" />
                  Man City
                </div>
              </div>
              <div class="flex flex-col justify-center gap-3">
                <div class="text-sm font-normal text-black">Đội Chấp: Kèo trên</div>
                <div class="text-sm font-normal text-black">Được Chấp: Kèo dưới</div>
              </div>
            </div>
            <TooltipArrow class="fill-secondary" :width="11" :height="8" />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider :disable-closing-trigger="true" :delay-duration="100">
        <Tooltip>
          <TooltipTrigger>
            <div class="flex cursor-pointer items-center gap-x-1">
              <SvgoBolt class="rounded-full bg-secondary p-0.5 text-base" />
              <p>So sánh kèo</p>
            </div>
          </TooltipTrigger>
          <TooltipContent
            side="bottom"
            :align="'end'"
            :align-offset="-85"
            class="mr-[85px] rounded-lg bg-secondary p-2"
          >
            <div class="mb-2.5 text-sm font-semibold text-black">Chức năng tự động soi kèo thông minh</div>
            <div class="flex gap-x-2.5">
              <Image src="/sport/sport-schedule/note-compare.webp" width="159px" height="40px" class="flex-none" />
              <div class="text-sm font-normal text-black">
                Kèo Hot là kèo thắng được<br />nhiều tiền hơn với cùng một tỉ lệ cược
              </div>
            </div>
            <TooltipArrow class="fill-secondary" :width="11" :height="8" />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  </div>
</template>

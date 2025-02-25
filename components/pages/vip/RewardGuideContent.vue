<script setup lang="ts">
import { getRewardGuide } from "~/components/pages/vip/static";
</script>

<template>
  <div class="flex flex-col">
    <div class="w-full overflow-hidden rounded-lg border border-[#FFFFFF1A] bg-[#242526] md:bg-background-bg-secondary">
      <table class="w-full border-collapse">
        <tbody>
          <tr
            v-for="row in getRewardGuide()"
            :key="row.description"
            class="flex items-center border-b border-[#FFFFFF1A] text-sm last:border-b-0 md:text-base"
          >
            <td class="flex h-full min-w-[92px] flex-row items-center justify-center gap-[34px] md:min-w-[481px]">
              <div v-for="item in row.leftContent" :key="item.label" class="flex flex-col items-center gap-[3px]">
                <Image v-if="item.icon" :src="item.icon" width="27px" height="24px" />
                <span class="text-center font-semibold text-text-primary">{{ item.label }}</span>
              </div>
            </td>
            <HTMLRenderer
              :html-content="row.description"
              class="flex w-full items-center border-l border-[#FFFFFF1A] p-3 font-normal leading-[22px] text-text-secondary md:min-h-[82px]"
            />
          </tr>
        </tbody>
      </table>
    </div>
    <slot name="action" />
  </div>
</template>

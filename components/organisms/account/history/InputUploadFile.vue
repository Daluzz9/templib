<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const emit = defineEmits<{
  (evt: "change-file", file: string): void;
}>();

const { changeFile, processingUpload, uploadFileName } = useUploadImage(emit);
defineProps({
  acceptType: {
    type: Array as PropType<string[]>,
    default: () => [".jpeg", ".png", ".jpg"],
  },
  refName: {
    type: String,
    default: "uploadFile",
  },
  id: {
    type: String,
    default: "uploadFile",
  },
  name: {
    type: String,
    default: "uploadFile",
  },
  placeholder: {
    type: String,
    default: "",
  },
  limitFileSize: {
    type: Number,
    default: 10485760,
  },
  labelType: {
    type: String,
    default: "input",
  },
  fileBrowseText: {
    type: String,
    default: "",
  },
  resetImgUpload: {
    type: Boolean,
    default: false,
  },
  idTransaction: {
    type: String,
    default: "",
  },
});
const $device = useDevice();
</script>

<template>
  <div
    class="relative flex h-14 w-full flex-col items-center justify-center rounded-lg border border-dashed border-border-primary bg-background-bg-secondary p-3"
  >
    <div class="w-full">
      <input
        :id="id"
        :ref="refName"
        :name="name"
        type="file"
        class="hidden"
        :accept="acceptType.join(',')"
        @change="changeFile(id, idTransaction, acceptType, limitFileSize)"
      />
      <div v-if="labelType === 'input'" class="flex items-center">
        <div v-if="!uploadFileName && !processingUpload" class="relative flex flex-1 items-center justify-between">
          <span
            class="max-w-[360px] flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-xs font-normal leading-4 text-neutral-200"
            >{{ placeholder }}</span
          >
        </div>
        <div v-else class="relative flex flex-1 items-center justify-between">
          <span
            :class="{ 'text-transparent': processingUpload }"
            class="max-w-[200px] flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-sm font-normal leading-4 text-white"
            >{{ uploadFileName }}</span
          >
        </div>

        <template v-if="processingUpload">
          <LoadingSpinner class="absolute flex h-full w-full items-center justify-center" />
        </template>

        <label
          class="flex h-8 w-20 min-w-[78px] items-center justify-center gap-2 rounded-lg bg-primary-400 text-xs font-semibold leading-4 text-white transition-all duration-200 hover:cursor-pointer hover:bg-primary-300"
          :for="id"
          :class="{ mobile: $device.isMobileOrTablet }"
        >
          {{ fileBrowseText }}
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  controller: {
    type: Object as PropType<IUseDialog>,
    required: true,
  },
});

const { isMobileOrTablet } = useDevice();

const { isLoadingSubmit, submitCancelPromotion } = useCancelPromotion();

const handleSubmit = async () => {
  await submitCancelPromotion();
  props.controller.closeDialog();
};
</script>

<template>
  <Dialog :controller="controller" :type="DialogTypeEnum.CANCEL_PROMOTION">
    <DialogTrigger as-child>
      <slot name="trigger" />
    </DialogTrigger>
    <DialogContent
      class="max-w-[343px]"
      :class="{ 'bg-[#292D30]': isMobileOrTablet }"
      :close-class="isMobileOrTablet && 'h-14'"
    >
      <DialogHeader
        class="h-14 px-4 py-2 lg:h-16"
        :class="{ 'w-full items-stretch justify-center border-none': isMobileOrTablet }"
      >
        <DialogTitle class="text-left" :class="{ 'text-sm font-semibold': isMobileOrTablet }">
          Hủy Khuyến Mãi
        </DialogTitle>
      </DialogHeader>

      <DialogBody>
        <ul class="flex flex-col gap-2">
          <li class="text-sm text-primary">
            &#9679; Sau khi huỷ khuyến mãi, toàn bộ ưu đãi, tiền thưởng, số dư tài khoản sẽ bị huỷ bỏ.
          </li>
          <li class="text-sm text-primary">
            &#9679; Số dư tài khoản sẽ bị trừ về <span class="text-warning">0 đồng.</span>
          </li>
        </ul>

        <div class="flex gap-3">
          <Button
            variant="secondary"
            size="xl"
            class="flex-1 rounded-lg"
            :disabled="isLoadingSubmit"
            @click="controller.closeDialog()"
          >
            Không Hủy
          </Button>
          <Button
            size="xl"
            class="flex-1 rounded-lg"
            :is-loading="isLoadingSubmit"
            :disabled="isLoadingSubmit"
            @click="handleSubmit"
          >
            Huỷ
          </Button>
        </div>
      </DialogBody>
    </DialogContent>
  </Dialog>
</template>

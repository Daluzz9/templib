<script setup lang="ts">
type IProps = {
  controller: IUseDialog;
};

const props = defineProps<IProps>();

const emits = defineEmits(["cancel-promotion"]);

const store = useAppStore();

const { isLoadingSubmit, submitCancelPromotion } = useCancelPromotion();

const handleSubmit = async () => {
  await submitCancelPromotion();
  props.controller.closeDialog();
  emits("cancel-promotion");
};
</script>

<template>
  <Dialog :controller="controller" :type="DialogTypeEnum.BLOCK_GAME">
    <DialogTrigger as-child>
      <slot name="trigger" />
    </DialogTrigger>
    <DialogContent>
      <DialogHeader class="items-start">
        <DialogTitle>Không thể chơi game này!</DialogTitle>
      </DialogHeader>

      <DialogBody>
        <ul class="mt-2 flex flex-col gap-2 text-sm">
          <li>
            &#9679; Quý khách cần hoàn thành số tiền cược yêu cầu
            <span class="text-warning-400">{{
              formatVNDCurrency(store.amountRolling / RATE_K_VND, {
                currencySymbol: CurrencySymbolEnum.K,
              })
            }}</span>
            của gói khuyến mãi
            <span class="text-warning-400">{{ store.systemPlan?.name.toLocaleLowerCase() }}</span>
            nạp lần đầu.
          </li>
          <li>&#9679; Quý khách vui lòng chọn game khác hoặc huỷ khuyến mãi để tham gia trò chơi này.</li>
        </ul>

        <div class="flex gap-3">
          <Button variant="outline" size="xl" class="flex-1" @click="controller.closeDialog">Quay Lại</Button>
          <Button size="xl" class="flex-1" :is-loading="isLoadingSubmit" @click="handleSubmit">Huỷ Khuyến Mãi</Button>
        </div>
      </DialogBody>
    </DialogContent>
  </Dialog>
</template>

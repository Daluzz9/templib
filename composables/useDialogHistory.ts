export const useDialogHistory = () => {
  const isTooltipVisible = ref<Record<string, boolean>>({});
  const contentTooltip = ref<Record<string, string>>({});
  const fillColor = ref<Record<string, string>>({});
  const statement_img = ref<string>("");

  const showButtonCopyFields = new Set<string>([
    TransactionFieldDetailEnum.MATCH_CODE,
    TransactionFieldDetailEnum.CODE,
    TransactionFieldDetailEnum.WALLET,
    TransactionFieldDetailEnum.CHECKED,
    TransactionFieldDetailEnum.WALLET_RECEIVED,
  ]);

  const hideTooltip = (field?: string) => {
    if (!field) return;
    isTooltipVisible.value[field] = false;
    contentTooltip.value[field] = "Nhấn để Copy";
    fillColor.value[field] = "text-secondary-foreground";
  };

  const isShowButtonCopy = (field?: string): boolean => {
    return !!field && showButtonCopyFields.has(field);
  };

  const setContentTooltip = (field: string, text: string) => {
    if (!field) return;
    isTooltipVisible.value[field] = true;
    contentTooltip.value[field] = text;
    fillColor.value[field] = "text-disable";
    stop();
    start(field);
  };

  const handleChangeFile = (file: string) => {
    statement_img.value = file;
  };

  const { start, stop } = useTimeoutFn((field: string) => {
    isTooltipVisible.value[field] = false;
    contentTooltip.value[field] = "Nhấn để Copy";
    fillColor.value[field] = "text-secondary-foreground";
  }, 3000);

  return {
    isShowButtonCopy,
    setContentTooltip,
    handleChangeFile,
    statement_img,
    contentTooltip,
    fillColor,
    isTooltipVisible,
    hideTooltip,
  };
};

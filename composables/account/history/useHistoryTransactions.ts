import dayjs from "dayjs";

const getTypeTitle = (type: TransactionHistoryTypeEnum, action: TransactionHistoryActionEnum) => {
  if (type === TransactionHistoryTypeEnum.PAYMENT) {
    return action === TransactionHistoryActionEnum.DEPOSIT
      ? MappedTransactionHistoryTitleEnum.DEPOSIT
      : MappedTransactionHistoryTitleEnum.WITHDRAW;
  }

  const typeTitleMapping: Record<TransactionHistoryTypeEnum, MappedTransactionHistoryTitleEnum | ""> = {
    [TransactionHistoryTypeEnum.WITHDRAW]: MappedTransactionHistoryTitleEnum.WITHDRAW,
    [TransactionHistoryTypeEnum.PROMOTION]: MappedTransactionHistoryTitleEnum.PROMOTION,
    [TransactionHistoryTypeEnum.COMMISSION]: MappedTransactionHistoryTitleEnum.COMMISSION,
    [TransactionHistoryTypeEnum.PROMOTION_CANCEL]: MappedTransactionHistoryTitleEnum.PROMOTION_CANCEL,
    [TransactionHistoryTypeEnum.PAYMENT]: "",
    [TransactionHistoryTypeEnum.DEPOSIT]: "",
  };

  return typeTitleMapping[type] || "";
};

export const getMethodImage = ({
  type,
  action = TransactionHistoryActionEnum.DEPOSIT,
}: {
  method: string;
  type: TransactionHistoryTypeEnum;
  action?: TransactionHistoryActionEnum;
}) => {
  return [TransactionHistoryTypeEnum.COMMISSION, TransactionHistoryTypeEnum.PROMOTION].includes(type)
    ? `SvgoAccountHistoryDetailBonus`
    : `SvgoAccount${action.charAt(0)?.toUpperCase() + action.slice(1).toLowerCase()}`;
};

export const useHistoryTransactions = () => {
  const nuxt = useNuxtApp();
  const { composableResponse } = useSharedComposableResponse<ITransactionHistoryData[]>();
  const $device = useDevice();
  const payload: Record<string, string | number> = {
    limit: 100,
  };

  const createTransactionItem = (detail: ITransactionHistoryData) => {
    const amountStatus = detail.action === TransactionHistoryActionEnum.DEPOSIT ? "+" : "-";
    let method = "";
    if (detail.method) {
      method =
        MappedTransactionHistoryMethodEnum[
          detail.method?.toUpperCase() as keyof typeof MappedTransactionHistoryMethodEnum
        ];
    }

    return {
      ...detail,
      id: detail.id ?? "",
      icon: getMethodImage({ method: detail.method, type: detail.type, action: detail.action }),
      title: getActionTitle({ action: detail.action, type: detail.type, method }),
      status: getTransitionStatus(detail.status),
      type: getTypeTitle(detail.type, detail.action),
      amount: `${amountStatus + (formatVNDCurrency(detail.amount) || 0)}`,
      time:
        dayjs(detail.created_time).format($device.isDesktop ? SHORT_DATE_FORMAT : DATE_TIME_HISTORY_SHORT_FORMAT) || "",
      status_class: getStatusClass(detail.status),
      action: detail.action,
      method,
      created_time: detail.created_time,
    };
  };

  const transactionExists = (id: string): boolean => {
    return dataTransactionHistory.value?.some((transaction) => String(transaction.id) === id) ?? false;
  };

  const addNewTransaction = () => {
    if (!composableResponse.value) {
      return;
    }

    const newTransaction = createTransactionItem(composableResponse.value[0]);

    if (!transactionExists(String(newTransaction.id)) && dataTransactionHistory.value) {
      dataTransactionHistory.value.unshift(newTransaction);
    }
  };

  const {
    data: dataTransactionHistory,
    error,
    status,
  } = useAsyncData(
    `getListTransactionHistory`,
    async () => {
      return await nuxt.$transactionHistoryService.getListTransactionHistory(payload);
    },
    {
      transform(res) {
        return res.map((item: ITransactionHistoryData) => {
          const amountStatus = item.action === TransactionHistoryActionEnum.DEPOSIT ? "+" : "-";
          let method = "";
          if (item.method) {
            method =
              MappedTransactionHistoryMethodEnum[
                item.method?.toUpperCase() as keyof typeof MappedTransactionHistoryMethodEnum
              ];
          }

          return {
            id: item.id,
            icon: getMethodImage({ method: item.method, type: item.type, action: item.action }),
            title: getActionTitle({ action: item.action, type: item.type, method }),
            status: getTransitionStatus(item.status),
            type: getTypeTitle(item.type, item.action),
            amount: `${amountStatus + (formatVNDCurrency(item.amount) || 0)}`,
            time:
              dayjs(item.created_time).format($device.isDesktop ? SHORT_DATE_FORMAT : DATE_TIME_HISTORY_SHORT_FORMAT) ||
              "",
            status_class: getStatusClass(item.status),
            action: item.action,
            method,
            created_time: item.created_time,
          };
        });
      },
      server: false,
    },
  );

  watchEffect(() => {
    if (dataTransactionHistory.value) {
      addNewTransaction();
    }
  });

  return {
    dataTransactionHistory,
    error,
    status,
  };
};

const INVOICE_LABEL_MAP = {
  ACCOUNT_NO: "Số tài khoản",
  ACCOUNT_NAME: "Tên tài khoản",
  TRANSFERRING_CONTENT: "Nội dung chuyển tiền",
};

type IInvoice = (IMomoSysDepositPaymentMethod | IViettelPaySysDepositPaymentMethod) & {
  transferContent?: string;
};

export const useDepositEWallet = () => {
  const { $depositService } = useNuxtApp();

  const appStore = useAppStore();
  const { systemDepositPayment } = storeToRefs(appStore);

  const route = useRoute();

  const invoice = ref<IInvoice | undefined>();
  const transferCode = ref<string | undefined>();

  const hasRefreshInvoice = computed<boolean>(() => {
    if (!eWalletInvoiceList.value) {
      return false;
    }

    return eWalletInvoiceList.value.length > 1;
  });

  const eWalletInvoiceList = computed<IInvoice[] | undefined>(() => {
    if (!systemDepositPayment.value) {
      return;
    }

    const invoiceList =
      route.query.type === EWalletPaymentMethodTypeEnum.VIETTEL_PAY
        ? systemDepositPayment.value.viettelPays
        : systemDepositPayment.value.momos;

    // get unique system payment
    const tempUniqueInvoiceListCheck: Record<string, boolean> = {};

    return invoiceList?.reduce(
      (list: IMomoSysDepositPaymentMethod[] | IViettelPaySysDepositPaymentMethod[], invoice) => {
        if (!tempUniqueInvoiceListCheck[invoice.account_no]) {
          tempUniqueInvoiceListCheck[invoice.account_no] = true;
          list.push(invoice);
        }
        return list;
      },
      [],
    );
  });

  const formattedInvoice = computed<IInvoiceField[]>(() => {
    return [
      {
        label: INVOICE_LABEL_MAP.ACCOUNT_NO,
        value: invoice.value?.account_no || "",
        isCopy: true,
      },
      {
        label: INVOICE_LABEL_MAP.ACCOUNT_NAME,
        value: invoice.value?.account_name.toLocaleUpperCase() || "",
        isCopy: true,
      },
      {
        label: INVOICE_LABEL_MAP.TRANSFERRING_CONTENT,
        value: invoice.value?.transferContent || "",
        isCopy: true,
      },
    ];
  });

  const invoiceQRCode = computed<string>(() => invoice.value?.qr_code || "");

  const handleRandomInvoice = (): void => {
    let randomInvoice;

    if (!eWalletInvoiceList.value) {
      return;
    }

    if (eWalletInvoiceList.value.length === 1) {
      invoice.value = eWalletInvoiceList.value[0];
      invoice.value.transferContent = transferCode.value;
      return;
    }

    do {
      const randomIndex = Math.floor(Math.random() * eWalletInvoiceList.value.length);
      randomInvoice = eWalletInvoiceList.value[randomIndex];
    } while (randomInvoice.account_no === invoice.value?.account_no || !randomInvoice.qr_code);

    if (randomInvoice) {
      invoice.value = randomInvoice;
      invoice.value.transferContent = transferCode.value;
    }
  };

  const { error } = useAsyncData(async () => {
    handleRandomInvoice();
    const eWalletTransferringCode = await $depositService.getEWalletTransferCode();
    transferCode.value = eWalletTransferringCode;
    if (invoice.value) {
      invoice.value.transferContent = eWalletTransferringCode;
    }

    return eWalletTransferringCode;
  });

  // handle change payment method
  watch(
    () => route.query.type,
    () => {
      handleRandomInvoice();
    },
  );

  return {
    error,
    invoiceQRCode,
    hasRefreshInvoice,
    formattedInvoice,
    handleRandomInvoice,
  };
};

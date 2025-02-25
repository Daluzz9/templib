export type IEWalletTransferCodeData = {
  code: string;
};

export type IDepositCardData = {
  id: number;
  code: string;
  type: string;
  action: string;
  card_code: string;
  card_provider: string;
  card_serial: string;
  created_time: string;
  amount: number;
  card_amount: number;
  method: string;
  status: string;
};

export type IDepositPhoneCardBody = {
  card_amount: number;
  card_code: string;
  card_serial: string;
  to_telcom_code: SystemPhoneCardPaymentNameEnum;
};

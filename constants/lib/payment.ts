export const CARD_WITHDRAWAL_RANGE = {
  MIN: 1,
  MAX: 5,
};

export const BANK_WITHDRAWAL_RANGE = {
  MAX: 8,
};

export const CARD_SERIAL_LENGTH = {
  ZING_MIN: 9,
  MIN: 10,
  MAX: 15,
};

export const scanLinkMap = {
  [CryptoNetwork.TRC20]: "https://tronscan.org/#/address/",
  [CryptoNetwork.ERC20]: "https://etherscan.io/address/",
  [CryptoNetwork.BEP20]: "https://bscscan.com/address/",
};

export const CARD_CODE_LENGTH = {
  ZING_MIN: 9,
  MIN: 10,
  MAX: 15,
};

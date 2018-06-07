// @flow

export const KEY_PAGE_ROW_COUNT = 4;
export const KEY_PAGE_COUNT = 2;
export const KEY_COLUMN_COUNT = 3;
export const KEY_PAGE_LENGTH = KEY_PAGE_ROW_COUNT * KEY_COLUMN_COUNT;
export const KEY_ROW_COUNT = KEY_PAGE_ROW_COUNT * KEY_PAGE_COUNT;
export const KEY_LENGTH = KEY_COLUMN_COUNT * KEY_ROW_COUNT;
export const MINIMAL_PASSWORD_LENGTH = 8;
export const MINIMAL_PIN_CODE_LENGTH = 6;
export const MAXIMAL_PIN_CODE_LENGTH = 8;

// @todo Select right interval
export const BALANCE_EXPIRATION_INTERVAL = 10 * 1000;

export const ACTIVITY_MESSAGES_LIMIT = 100;

export const NATION_INDEX_PERIOD = 30 * 1000;

export const TRANSACTIONS_WORKER_RECOVER_DELAY = 30 * 1000;

// Screen sizes for Normalizer

export const FOUR_INCHES = 568;

export const FOUR_DOT_SEVEN_INCHES = 667;

export const FIVE_DOT_FIVE_INCHES = 736;

export const FIVE_DOT_EIGHT_INCHES = 812;

// Contract Address for PAT Tokens

export const PAT_DEV_ADDRESS = '0xc3830a6206fb9d089d1ce824598978532d14d8aa';

export const PAT_PROD_ADDRESS = '0xBB1fA4FdEB3459733bF67EbC6f893003fA976a82';

export const TX_JOB_STATUS = {
  UNKNOWN: 0,
  PENDING: 200,
  SUCCESS: 300,
  FAILED: 400,
};

export const TX_JOB_TYPE = {
  NATION_CREATE: 'NATION_CREATE',
  NATION_JOIN: 'NATION_JOIN',
  NATION_LEAVE: 'NATION_LEAVE',
  ETH_SEND: 'ETH_SEND',
};

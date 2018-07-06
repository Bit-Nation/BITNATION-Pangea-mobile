// @flow

export type ExchangeInitiatedMessageData = {
  deployTxHash: string,
  etherAmount: string,
  tokenAmount: string,
  /**
   * @desc Address of token contract
   */
  tokenContractAddress: string,
  /**
   * @desc Address of person who should pay the tokens.
   */
  tokensFromAddress: string,
  /**
   * @desc Name of person who should pay the tokens.
   */
  tokensFromName: string,
}

export const MESSAGE_TYPES = {
  EXCHANGE_INITIATED: 'EXCHANGE_INITIATED',
};

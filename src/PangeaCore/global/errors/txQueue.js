export class InvalidTxType extends Error {
  transKey: string = 'systemError.txQueue.invalidTxType';
  txType: string;

  constructor(txType: string) {
    super();

    this.txType = txType;
  }
}

export class InvalidTxHash extends Error {
  transKey: string = 'systemError.txQueue.invalidTxHash';
  txHash: string;

  constructor(txHash: string) {
    super();

    this.txHash = txHash;
  }
}

// @flow
import Realm from 'realm';

import { TX_JOB_STATUS, TX_JOB_TYPE } from '../../global/Constants';
import { InvalidTxHash, InvalidTxType } from '../../global/errors/txQueue';
import type { TransactionJobType } from '../database/schemata';
import EthereumService from '../ethereum';

/**
 * @desc Factory to create a transaction job object.
 * @param {string} txHash Transaction hash.
 * @param {string} type Transaction type, types list are under TX_JOB_TYPE constant.
 * @param {string} accountId Id of account that job is related to.
 * @return {Promise<TransactionJobType>} Built job
 */
export async function jobFactory(txHash: string, type: string, accountId: string): Promise<TransactionJobType> {
  const allowedTypes = Object.keys(TX_JOB_TYPE);

  if (allowedTypes.includes(type) === false) {
    throw new InvalidTxType(type);
  }

  if (!/^0x([A-Fa-f0-9]{64})$/.exec(txHash)) {
    throw new InvalidTxHash(txHash);
  }

  const job: TransactionJobType = {
    txHash,
    status: TX_JOB_STATUS.PENDING,
    type,
    nation: null,
    accountId,
  };

  return job;
}

export default class TxProcessor {
  constructor(ethereumService: EthereumService, dbPromise: Promise<Realm>) {
    this.ethereumService = ethereumService;
    this.dbPromise = dbPromise;
  }

  ethereumService: EthereumService;
  dbPromise: Promise<Realm>;

  async processTransaction(tx: TransactionJobType, changeType: 'initial' | 'added' | 'modified') {
    if (tx.status !== TX_JOB_STATUS.PENDING) {
      return;
    }

    const result = await this.ethereumService.nations.provider.getTransactionReceipt(tx.txHash);
  }

  cleanUp() {

  }
}

// @flow
import { TX_JOB_STATUS, TX_JOB_TYPE } from '../../global/Constants';
import { InvalidTxHash, InvalidTxType } from '../../global/errors/txQueue';
import type { TransactionJobType } from '../database/schemata';

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
    nation: [],
    accountId,
  };

  return job;
}

// @flow

import Realm from 'realm';

import EthereumService from '../ethereum';
import type { NationType, EditingNationType, DBNationType, NationIdType } from '../../types/Nation';
import { convertDraftToDatabase, convertNationToBlockchain } from '../../utils/nations';
import { NationAlreadySubmitted, StateMutateNotPossible } from '../../global/errors/nations';
import { DatabaseWriteFailed } from '../../global/errors/common';
import { jobFactory } from '../txQueue';
import { TX_JOB_STATUS, TX_JOB_TYPE } from '../../global/Constants';

export default class NationsService {
  constructor(ethereumService: EthereumService, dbPromise: Promise<Realm>) {
    this.ethereumService = ethereumService;
    this.dbPromise = dbPromise;
  }

  ethereumService: EthereumService;
  dbPromise: Promise<Realm>;

  // Drafts operations

  async updateDraft(nationId: number, nationData: EditingNationType): Promise<DBNationType> {
    const db = await this.dbPromise;
    const oldNation = await this.nationById(nationId);

    // idInSmartContract >= 0 only when the nation was written to the blockchain
    // @todo we really really need to check for if the nation was already submitted. But we need to have the tx queue thing.
    if (oldNation.idInSmartContract >= 0) {
      throw new NationAlreadySubmitted();
    }

    try {
      let nation: DBNationType;
      db.write(() => {
        nation = db.create('Nation', convertDraftToDatabase(nationData, nationId), true);
      });

      return (nation: any);
    } catch (error) {
      throw new DatabaseWriteFailed();
    }
  }

  async saveDraft(nationData: EditingNationType): Promise<DBNationType> {
    const db = await this.dbPromise;
    try {
      let nation: DBNationType;
      db.write(() => {
        const sorted = db.objects('Nation').sorted('id', true);
        const newId = (sorted.length === 0 ? 1 : sorted[0].id + 1);
        nation = db.create('Nation', convertDraftToDatabase(nationData, newId));
      });

      return (nation: any);
    } catch (error) {
      throw new DatabaseWriteFailed(error);
    }
  }

  async submitDraft(nationId: number): Promise<DBNationType> {
    const db = await this.dbPromise;
    const nation = await this.nationById(nationId);

    // idInSmartContract >= 0 only when the nation was written to the blockchain
    // @todo we really really need to check for if the nation was already submitted. But we need to have the tx queue thing.
    if (nation.idInSmartContract >= 0) {
      throw new NationAlreadySubmitted();
    }

    if (this.canMutateNationState(nation) === false) {
      throw new StateMutateNotPossible();
    }

    const nationData = convertNationToBlockchain(nation);
    const tx = await this.ethereumService.nations.createNation(JSON.stringify(nationData));

    const txJob = await jobFactory(tx.hash, TX_JOB_TYPE.NATION_CREATE);
    try {
      db.write(() => {
        nation.tx = txJob;
        nation.stateMutateAllowed = false;
      });

      return nation;
    } catch (error) {
      throw new DatabaseWriteFailed(error);
    }
  }

  async saveAndSubmit(nationData: EditingNationType): Promise<DBNationType> {
    const draft = await this.saveDraft(nationData);
    return this.submitDraft(draft.id);
  }

  async deleteDraft(nationId: number): Promise<void> {
    const db = await this.dbPromise;
    const nation = await this.nationById(nationId);

    if (nation.idInSmartContract >= 0) {
      throw new NationAlreadySubmitted();
    }

    try {
      db.write(() => {
        db.delete(nation);
      });
    } catch (error) {
      throw new DatabaseWriteFailed(error);
    }
  }

  // Join/leave

  async joinNation(nationData: NationType): Promise<void> {
    const db = await this.dbPromise;
    const nation = await this.nationById(nationData.id);

    if (this.canMutateNationState(nation) === false) {
      throw new StateMutateNotPossible();
    }

    const tx = this.ethereumService.nations.joinNation(nation.idInSmartContract);
    const txJob = await jobFactory(tx.hash, TX_JOB_TYPE.NATION_JOIN);
    try {
      db.write(() => {
        nation.tx = txJob;
        nation.stateMutateAllowed = false;
      });
    } catch (_) {
      throw new DatabaseWriteFailed();
    }
  }

  async leaveNation(nationData: NationType): Promise<void> {
    const db = await this.dbPromise;
    const nation = await this.nationById(nationData.id);

    if (this.canMutateNationState(nation) === false) {
      throw new StateMutateNotPossible();
    }

    const tx = this.ethereumService.nations.leaveNation(nation.idInSmartContract);
    const txJob = await jobFactory(tx.hash, TX_JOB_TYPE.NATION_LEAVE);
    try {
      db.write(() => {
        nation.tx = txJob;
        nation.stateMutateAllowed = false;
      });
    } catch (_) {
      throw new DatabaseWriteFailed();
    }
  }

  // Utilities

  async nationById(id: NationIdType): Promise<DBNationType> {
    const db = await this.dbPromise;
    const nations = db.objects('Nation').filtered(`id = "${id}"`);
    if (nations.length === 0) {
      throw new Error('system_error.nation.does_not_exist');
    }

    return nations[0];
  }

  /**
   * @desc Check if the blockchain state of the nation can be mutated
   * @param {DBNationType | NationType} nation Nation to check
   * @returns {boolean} Return true if state can be mutated
   */
  canMutateNationState = (nation: DBNationType | NationType): boolean => {
    if (nation.tx == null) {
      return true;
    }
    return nation.tx.status === TX_JOB_STATUS.SUCCESS;
  };
}

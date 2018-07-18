// @flow

import Realm from 'realm';
import uuid from 'uuid4';

import EthereumService from '../ethereum';
import type { NationType, EditingNationType, DBNationType, NationIdType } from '../../types/Nation';
import { convertDraftToDatabase, convertNationToBlockchain } from '../../utils/nations';
import { NationAlreadySubmitted, StateMutateNotPossible } from '../../global/errors/nations';
import { DatabaseWriteFailed } from '../../global/errors/common';
import { jobFactory } from '../txProcessor';
import {
  NATIONS_DEV_ENDPOINT,
  NATIONS_PROD_ENDPOINT,
  TX_JOB_STATUS,
  TX_JOB_TYPE,
} from '../../global/Constants';

export default class NationsService {
  constructor(ethereumService: EthereumService, dbPromise: Promise<Realm>, accountId: string) {
    this.ethereumService = ethereumService;
    this.dbPromise = dbPromise;
    this.currentAccountId = accountId;
    this.logsProcessingPromise = Promise.resolve();
  }

  ethereumService: EthereumService;
  dbPromise: Promise<Realm>;
  currentAccountId: string;
  logsProcessingPromise: Promise<void>;

  // Drafts operations

  async updateDraft(nationId: NationIdType, nationData: EditingNationType): Promise<DBNationType> {
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
        nation = db.create('Nation', convertDraftToDatabase(nationData, nationId, this.currentAccountId), true);
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
      const newId = await this.newNationId();
      db.write(() => {
        nation = db.create('Nation', convertDraftToDatabase(nationData, newId, this.currentAccountId));
      });

      return (nation: any);
    } catch (error) {
      throw new DatabaseWriteFailed(error);
    }
  }

  async submitDraft(nationId: NationIdType): Promise<DBNationType> {
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

    const txJob = await jobFactory(tx.hash, TX_JOB_TYPE.NATION_CREATE, this.currentAccountId);
    try {
      db.write(() => {
        nation.tx = txJob;
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

  async deleteDraft(nationId: NationIdType): Promise<void> {
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

    const tx = await this.ethereumService.nations.joinNation(nation.idInSmartContract);
    const txJob = await jobFactory(tx.hash, TX_JOB_TYPE.NATION_JOIN, this.currentAccountId);
    try {
      db.write(() => {
        nation.tx = txJob;
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

    const tx = await this.ethereumService.nations.leaveNation(nation.idInSmartContract);
    const txJob = await jobFactory(tx.hash, TX_JOB_TYPE.NATION_LEAVE, this.currentAccountId);
    try {
      db.write(() => {
        nation.tx = txJob;
      });
    } catch (_) {
      throw new DatabaseWriteFailed();
    }
  }

  // Indexing

  async requestNationLogsHistory(): Promise<any> {
    const URL = this.ethereumService.network === 'dev' ? NATIONS_DEV_ENDPOINT : NATIONS_PROD_ENDPOINT;
    const response = await fetch(URL, {
      headers: {
        'content-type': 'application/json',
      },
      method: 'GET',
    });
    if (response.ok !== true) {
      throw new Error('[TEST] Nation logs fetch failed');
    }
    return Promise.resolve(response.json());
  }

  async registerNationIndexing() {
    const self = this;
    this.ethereumService.nations.onnationcreated = function processLog() {
      // BE CAREFUL! Since strange API of ether.js log passed here as a 'this'.
      const log = this;

      self.updateNationsFromLogs([{ idInSmartContract: log.args.nationId.toNumber(), txHash: log.transactionHash }])
        .catch((error) => {
          console.log(`[PANGEA] Nation update fails with error ${error.message}`);
        });
    };

    // eslint-disable-next-line camelcase
    const nationLogs = (await this.requestNationLogsHistory()).map(({ id, tx_hash }) => ({
      idInSmartContract: id,
      txHash: tx_hash,
    }));
    console.log(`[TEST] Nation logs ${JSON.stringify(nationLogs)}`);

    return this.updateNationsFromLogs(nationLogs);
  }

  async updateNationsFromLogs(logs: Array<{ idInSmartContract: number, txHash: string | null }>) {
    const db = await this.dbPromise;

    // For some reason we sometimes get object instead of array here. This object contains nations that we don't actually join. So we ignore it.
    const joinedNationBNIds = (await this.ethereumService.nations.getJoinedNations({ from: this.ethereumService.wallet.address }));

    const joinedNationIds = Array.isArray(joinedNationBNIds) === true ? joinedNationBNIds.map(bigNumber => bigNumber.toNumber()) : [];

    const writePromises = logs.map(async (log) => {
      console.log(`[TEST] Start processing log for id ${log.idInSmartContract}`);

      const { txHash, idInSmartContract } = log;
      const citizensNumber = (await this.ethereumService.nations.getNumCitizens(idInSmartContract)).toNumber();
      const isNationJoined: boolean = joinedNationIds.includes(idInSmartContract);
      const draftToUpdate: DBNationType = db.objects('Nation').filtered(`tx.txHash = '${txHash || ''}' AND tx.type = '${TX_JOB_TYPE.NATION_CREATE}'`)[0];
      if (draftToUpdate != null) {
        console.log('[TEST] Updating draft');
        return () => {
          draftToUpdate.idInSmartContract = idInSmartContract;
          draftToUpdate.joined = isNationJoined;
          draftToUpdate.citizens = citizensNumber;
        };
      }

      const nationToUpdate: DBNationType = db.objects('Nation').filtered(`accountId = '${this.currentAccountId}' && idInSmartContract = ${idInSmartContract}`)[0];
      if (nationToUpdate != null) {
        console.log('[TEST] Updating nation');
        // It's a nation that somehow is already in database, so we just update it.
        return () => {
          nationToUpdate.joined = isNationJoined;
          nationToUpdate.citizens = citizensNumber;
        };
      }

      const nationData = JSON.parse(await this.ethereumService.nations.getNationMetaData(idInSmartContract));

      console.log(`[TEST] Creating nation ${idInSmartContract}`);

      return () => {
        db.create('Nation', {
          id: this.newNationId(),
          accountId: this.currentAccountId,
          idInSmartContract,
          nationName: nationData.nationName,
          nationDescription: nationData.nationDescription,
          created: true,
          exists: nationData.exists,
          virtualNation: nationData.virtualNation,
          nationCode: nationData.nationCode,
          lawEnforcementMechanism: nationData.lawEnforcementMechanism,
          profit: nationData.profit,
          nonCitizenUse: nationData.nonCitizenUse,
          diplomaticRecognition: nationData.diplomaticRecognition,
          decisionMakingProcess: nationData.decisionMakingProcess,
          governanceService: nationData.governanceService,
          joined: isNationJoined,
          citizens: citizensNumber,
        });
      };
    });

    const writes = await Promise.all(writePromises);
    console.log('[TEST] Created writes');
    db.write(() => {
      writes.forEach(fn => fn());
    });
    console.log('[TEST] Done');
  }

  // Utilities

  newNationId(): Promise<NationIdType> {
    return uuid();
  }

  async nationById(id: NationIdType): Promise<DBNationType> {
    const db = await this.dbPromise;
    const nations = db.objects('Nation').filtered(`id = '${id}'`);
    if (nations.length === 0) {
      throw new Error('system_error.nation.does_not_exist');
    }

    return nations[0];
  }

  cleanUp() {
    this.ethereumService.nations.onnationcreated = null;
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
    return nation.tx.status !== TX_JOB_STATUS.PENDING;
  };
}

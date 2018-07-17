// @flow

import Realm from 'realm';
import { Thread } from 'react-native-threads';
import EthereumService from '../ethereum';
import type { NationType, EditingNationType, DBNationType, NationIdType } from '../../types/Nation';
import { convertDraftToDatabase, convertNationToBlockchain } from '../../utils/nations';
import { NationAlreadySubmitted, StateMutateNotPossible } from '../../global/errors/nations';
import { DatabaseWriteFailed } from '../../global/errors/common';
import { jobFactory } from '../txProcessor';
import {
  NATION_DEV_CONTRACT_CREATION_BLOCK, NATION_PROD_CONTRACT_CREATION_BLOCK, TX_JOB_STATUS,
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

  async registerNationIndexing() {
    const firstBlock = this.ethereumService.network === 'dev' ? NATION_DEV_CONTRACT_CREATION_BLOCK : NATION_PROD_CONTRACT_CREATION_BLOCK;

    return new Promise(async (resolve, reject) => {
      const self = this;
      let expectedNationsNumber = (await this.ethereumService.nations.numNations()).toNumber();

      this.ethereumService.nations.onnationcreated = function processLog() {
        // BE CAREFUL! Since strange API of ether.js log passed here as a 'this'.
        const log = this;

        self.performNationUpdate(log.args.nationId.toNumber(), log.transactionHash)
          .then(() => {
            expectedNationsNumber -= 1;
            if (expectedNationsNumber === 0) {
              resolve();
            }
          })
          .catch((error) => {
            console.log(error.toString());
            reject(error);
          });
      };

      if (expectedNationsNumber === 0) {
        resolve();
      }

      this.ethereumService.nations.provider.resetEventsBlock(firstBlock);
    });
  }

  async performNationUpdate(idInSmartContract: number, txHash: string | null) {
    const db = await this.dbPromise;
    const draftToUpdate: DBNationType = db.objects('Nation').filtered(`tx.txHash = '${txHash || ''}' AND tx.type = '${TX_JOB_TYPE.NATION_CREATE}'`)[0];
    if (draftToUpdate != null && draftToUpdate.idInSmartContract !== idInSmartContract) {
      // It's a draft that we need to update in database as submitted nation
      db.write(() => {
        draftToUpdate.idInSmartContract = idInSmartContract;
      });
    }

    // For some reason we sometimes get object instead of array here. This object contains nations that we don't actually join. So we ignore it.
    const joinedNations = (await this.ethereumService.nations.getJoinedNations({ from: this.ethereumService.wallet.address }));
    let isNationJoined: boolean = false;
    if (Array.isArray(joinedNations) === true) {
      isNationJoined = joinedNations.map(bigNumber => bigNumber.toNumber()).includes(idInSmartContract);
    }
    const citizensNumber = (await this.ethereumService.nations.getNumCitizens(idInSmartContract)).toNumber();

    const nationToUpdate: DBNationType = db.objects('Nation').filtered(`accountId = '${this.currentAccountId}' && idInSmartContract = ${idInSmartContract}`)[0];
    if (nationToUpdate != null && (nationToUpdate.joined !== isNationJoined || nationToUpdate.citizens !== citizensNumber)) {
      // It's a nation that somehow is already in database, so we just update it.
      db.write(() => {
        nationToUpdate.joined = isNationJoined;
        nationToUpdate.citizens = citizensNumber;
      });
    }

    if (draftToUpdate != null || nationToUpdate != null) {
      // Since we update a nation we don't need to create it again.
      return;
    }

    // const nationData = JSON.parse(await this.ethereumService.nations.getNationMetaData(idInSmartContract));
    const nationDataJson = JSON.parse(await this.ethereumService.nations.getNationMetaData(idInSmartContract));
    nationDataJson.idInSmartContract = idInSmartContract;
    nationDataJson.joined = isNationJoined;
    nationDataJson.citizens = citizensNumber;
    nationDataJson.accountId = this.currentAccountId;
    nationDataJson.id = await this.newNationId();
    const thread = new Thread('worker.js');
    thread.postMessage(JSON.stringify(nationDataJson));
    thread.onmessage = (message) => { console.log(message); };
    /* const newId = await this.newNationId();
    db.write(() => {
      db.create('Nation', {
        id: newId,
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
    }); */
  }

  // Utilities

  async newNationId(): Promise<number> {
    const db = await this.dbPromise;
    const sorted = db.objects('Nation').sorted('id', true);
    return (sorted.length === 0 ? 1 : sorted[0].id + 1);
  }

  async nationById(id: NationIdType): Promise<DBNationType> {
    const db = await this.dbPromise;
    const nations = db.objects('Nation').filtered(`id = ${id}`);
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

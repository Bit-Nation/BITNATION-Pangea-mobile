// @flow

import type { TransactionJobType } from 'BITNATION-Pangea-libs/src/database/schema/v2';

export type { NationInputType as DBNationInputType } from 'BITNATION-Pangea-libs/src/ethereum/nation';
export type { NationType as DBNationType } from 'BITNATION-Pangea-libs/src/database/schemata';

export type NationIdType = number;

export type EditingNationType = {
  id?: NationIdType,
  nationName: string,
  nationDescription: string,
  exists: boolean,
  virtualNation: boolean | null,
  nationCode: string,
  lawEnforcementMechanism: string,
  profit: boolean,
  nonCitizenUse: boolean,
  diplomaticRecognition: boolean,
  decisionMakingProcess: string,
  governanceService: Array<string>,
}

export type NationType = {
  id: NationIdType,
  idInSmartContract: number,
  created: boolean,
  nationName: string,
  nationDescription: string,
  exists: boolean,
  virtualNation: boolean,
  nationCode: string,
  lawEnforcementMechanism: string,
  profit: boolean,
  nonCitizenUse: boolean,
  diplomaticRecognition: boolean,
  decisionMakingProcess: string,
  governanceService: Array<string>,
  citizens: number,
  joined: boolean,
  stateMutateAllowed: boolean,
  resetStateMutateAllowed: boolean,
  tx: TransactionJobType | null
}

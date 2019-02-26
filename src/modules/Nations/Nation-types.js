// @flow

import type { TransactionJobType } from '@pangea/database/schemata';

// eslint-disable-next-line import/prefer-default-export
export type { NationType as DBNationType } from '@pangea/database/schemata';

export type NationIdType = string;

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
  accountId: string,
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
  tx: TransactionJobType | null,
  ethAddress: string
}

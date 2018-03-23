// @flow
import _ from 'lodash';
import {
  TX_JOB_STATUS_PENDING,
  TX_JOB_STATUS_FAILED,
  TX_JOB_STATUS_SUCCESS,
} from 'BITNATION-Pangea-libs/src/queues/transaction';
import Colors from '../global/colors';
import type { DBNationType, NationType, EditingNationType } from '../types/Nation';

export {
  TX_JOB_STATUS_PENDING,
  TX_JOB_STATUS_FAILED,
  TX_JOB_STATUS_SUCCESS,
} from 'BITNATION-Pangea-libs/src/queues/transaction';

/**
 *
 * @param nations {Array<NationType>} an list of nations
 * @param id {number} the id of the nation
 * @returns {*|ReactWrapper|ConfigT|ShallowWrapper}
 */
export function resolveNation(nations: Array<NationType>, id: number) {
  return _.find(nations, nation => nation.id === id);
}

/**
 * @define NationStatusCode
 * @desc 0 = unknown | 200 = pending | 300 = succeed | 400 = failed (take a look at the transaction queue for the status codes)
 */
type NationStatusCode = 0 | 200 | 300 | 400;

/**
 * @define NationStatusType
 * @desc Describes type of operation that status is related to, e.g. join, leave, create, etc.
 */
type NationStatusType = 'NONE' | 'NATION_JOIN' | 'NATION_LEAVE' | 'NATION_CREATE';

/**
 * @define NationStatus
 * @property {string} key the translation key of the status
 * @property {NationStatusType} type the type of the status
 * @property {NationStatusCode} code the code of the status
 */
type NationStatus = {
  key: string,
  type: NationStatusType,
  code: NationStatusCode
}

/**
 * @desc Takes a nation and return's the status that should be displayed to the user
 * @param nation
 * @returns {Object}
 */
export function resolveStatus(nation: NationType): NationStatus | null {
  // idInSmartContract only exist when the nation was created
  if (nation.idInSmartContract === -1 && nation.tx === null) {
    return {
      key: 'draft',
      type: 'NONE',
      code: 0,
    };
  }

  if (nation.tx === null) {
    return null;
  }

  return {
    key: `${nation.tx.type}.${nation.tx.status}`,
    type: ((nation.tx.type: any): NationStatusType),
    code: ((nation.tx.status: any): NationStatusCode),
  };
}

/**
 * @desc Returns true if nation is a draft, false otherwise.
 * @param nation
 * @returns {boolean}
 */
export function nationIsDraft(nation: NationType): boolean {
  return nation.idInSmartContract === -1 && nation.tx === null;
}

/**
 * @todo need's rewrite of the param's
 * @param nationData
 * @returns {DBNationType}
 */
export function convertToDatabase(nationData: NationType): DBNationType {
  return {
    id: nationData.id,
    idInSmartContract: nationData.idInSmartContract,
    created: nationData.created,
    nationName: nationData.nationName,
    nationDescription: nationData.nationDescription,
    exists: nationData.exists,
    // @todo Fix virtual nation save unselected state
    virtualNation: nationData.virtualNation === null ? true : nationData.virtualNation,
    nationCode: nationData.nationCode,
    lawEnforcementMechanism: nationData.lawEnforcementMechanism,
    profit: nationData.profit,
    nonCitizenUse: nationData.nonCitizenUse,
    diplomaticRecognition: nationData.diplomaticRecognition,
    decisionMakingProcess: nationData.decisionMakingProcess,
    governanceService: nationData.governanceService.join(', '),
    citizens: nationData.citizens,
    joined: nationData.joined,
    stateMutateAllowed: nationData.stateMutateAllowed,
    resetStateMutateAllowed: nationData.resetStateMutateAllowed,
    tx: nationData.tx,
  };
}

/**
 * @todo need's rewrite of the param's
 * @param nation
 * @returns {NationType}
 */
export function convertFromDatabase(nation: DBNationType): NationType {
  return {
    id: nation.id,
    idInSmartContract: nation.idInSmartContract,
    created: nation.created,
    nationName: nation.nationName,
    nationDescription: nation.nationDescription,
    exists: nation.exists,
    virtualNation: nation.virtualNation,
    nationCode: nation.nationCode,
    lawEnforcementMechanism: nation.lawEnforcementMechanism,
    profit: nation.profit,
    nonCitizenUse: nation.nonCitizenUse,
    diplomaticRecognition: nation.diplomaticRecognition,
    decisionMakingProcess: nation.decisionMakingProcess,
    governanceService: nation.governanceService.split(', ').filter(value => !_.isEmpty(value)),
    citizens: nation.citizens,
    joined: nation.joined,
    stateMutateAllowed: nation.stateMutateAllowed,
    resetStateMutateAllowed: nation.resetStateMutateAllowed,
    tx: nation.tx === null ? null : { ...nation.tx },
    ethAddress: '',
  };
}

/**
 * @desc Convert NationType value to EditingNationType value
 * @param {NationType} nation Nation to convert
 * @return {EditingNationType} Convert nation.
 */
export function convertToEditingNation(nation: NationType): EditingNationType {
  return {
    ...nation,
  };
}

/**
 * @todo need's rewrite of the param's
 * @param nation
 * @returns {boolean}
 */
export function nationIsValid(nation: any) {
  if (_.isEmpty(nation.nationName)) return false;
  if (_.isEmpty(nation.nationDescription)) return false;
  if (nation.virtualNation === null || nation.virtualNation === undefined) return false;
  if (_.isEmpty(nation.nationCode)) return false;
  if (_.isEmpty(nation.lawEnforcementMechanism)) return false;
  if (_.isEmpty(nation.decisionMakingProcess)) return false;
  if (_.isEmpty(nation.governanceService)) return false;

  return true;
}

/**
 * @desc Takes a nation's key status and returns the corresponding color
 * @param status
 * @returns {Color}
 */
export function statusColor(status: number) {
  switch (status) {
    case TX_JOB_STATUS_SUCCESS:
      return Colors.listItemTextState.accepted;
    case TX_JOB_STATUS_FAILED:
      return Colors.listItemTextState.rejected;
    case TX_JOB_STATUS_PENDING:
      return Colors.listItemTextState.pending;
    default:
      return Colors.listItemTextState.default;
  }
}

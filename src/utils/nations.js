// @flow
import _ from 'lodash';
import Colors from '../global/colors';
import type { DBNationType, NationType, EditingNationType } from '../types/Nation';
import { TX_JOB_STATUS } from '../global/Constants';

/**
 * @desc Function to get a nation by id from array.
 * @param {NationType[]} nations List of nations
 * @param {number} id Id of the nation
 * @return {?NationType} Nation or null if there is no nation with that id.
 */
export function resolveNation(nations: Array<NationType>, id: number): NationType | null {
  const resolved = _.find(nations, nation => nation.id === id);
  if (resolved === undefined) {
    return null;
  }

  return resolved;
}

/**
 * @define NationStatusCode
 * @desc 0 = unknown | 200 = pending | 300 = succeed | 400 = failed
 * (take a look at the transaction queue for the status codes)
 */
type NationStatusCode = 0 | 200 | 300 | 400;

/**
 * @define NationStatusType
 * @desc Describes type of operation that status is related to, e.g. join, leave, create, etc.
 */
type NationStatusType = 'NONE' | 'NATION_JOIN' | 'NATION_LEAVE' | 'NATION_CREATE';

/**
 * @define NationStatus
 * @property {string} key Translation key of the status
 * @property {NationStatusType} type Type of the status
 * @property {NationStatusCode} code Code of the status
 */
type NationStatus = {
  key: string,
  type: NationStatusType,
  code: NationStatusCode
}

/**
 * @desc Takes a nation and returns the status that should be displayed to the user
 * @param {NationType} nation Nation to get a status for.
 * @return {?NationStatus} Nation status or null if status is not defined.
 */
export function resolveStatus(nation: NationType): (NationStatus | null) {
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
 * @param {NationType} nation Nation to be checked.
 * @return {boolean} True if nation is a draft, false otherwise.
 */
export function nationIsDraft(nation: NationType): boolean {
  return nation.idInSmartContract === -1 && nation.tx === null;
}

/**
 * @desc Converts app editing nation model to database model.
 * @param {EditingNationType} nation Editing nation to be converted.
 * @param {number} nationId Id of nation to be set.
 * @param {string} accountId Id of account that nation is related to.
 * @return {*} Object to create a database model (it is without optional values)
 */
export function convertDraftToDatabase(nation: EditingNationType, nationId: number, accountId: string): * {
  return {
    id: nationId,
    accountId,
    created: false,
    nationName: nation.nationName,
    nationDescription: nation.nationDescription,
    exists: nation.exists,
    // @todo Fix virtual nation save unselected state
    virtualNation: nation.virtualNation == null ? true : nation.virtualNation,
    nationCode: nation.nationCode,
    lawEnforcementMechanism: nation.lawEnforcementMechanism,
    profit: nation.profit,
    nonCitizenUse: nation.nonCitizenUse,
    diplomaticRecognition: nation.diplomaticRecognition,
    decisionMakingProcess: nation.decisionMakingProcess,
    governanceService: nation.governanceService.join(', '),
  };
}

/**
 * @desc Converts database model to object to use in smart contract.
 * @param {DBNationType} nation Nation to be converted
 * @return {*} Object to pass into smart contract
 */
export function convertNationToBlockchain(nation: DBNationType) {
  return {
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
    governanceService: nation.governanceService,
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
 * @desc Converts app nation model to database model.
 * @param {NationType} nationData Nation data to be converted.
 * @return {DBNationType} Database nation model.
 */
export function convertToDatabase(nationData: NationType): DBNationType {
  return {
    ...convertDraftToDatabase(convertToEditingNation(nationData), nationData.id, nationData.accountId),
    idInSmartContract: nationData.idInSmartContract,
    created: nationData.created,
    citizens: nationData.citizens,
    joined: nationData.joined,
    tx: nationData.tx,
  };
}

/**
 * @desc Converts nation from database model to app model.
 * @param {DBNationType} nation Database model of nation to be converted.
 * @return {NationType} Converted app nation model.
 */
export function convertFromDatabase(nation: DBNationType): NationType {
  return {
    id: nation.id,
    accountId: nation.accountId,
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
    tx: nation.tx === null ? null : { ...nation.tx },
    ethAddress: '',
  };
}

/**
 * @desc Validates the nation information.
 * @param {EditingNationType} nation Nation information to validate.
 * @return {boolean} Boolean value if the nation is valid.
 */
export function nationIsValid(nation: EditingNationType | NationType): boolean {
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
 * @desc Takes a nations status code and returns corresponding color
 * @param {number} status Nation status code.
 * @return {Color} Color constant to display the status.
 */
export function statusColor(status: number) {
  switch (status) {
    case TX_JOB_STATUS.SUCCESS:
      return Colors.listItemTextState.accepted;
    case TX_JOB_STATUS.FAILED:
      return Colors.listItemTextState.rejected;
    case TX_JOB_STATUS.PENDING:
      return Colors.listItemTextState.pending;
    default:
      return Colors.listItemTextState.default;
  }
}


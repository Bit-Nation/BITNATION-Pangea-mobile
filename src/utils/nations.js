//@flow
import _ from 'lodash';
import type {NationType} from 'BITNATION-Pangea-libs/src/database/schemata'

/**
 *
 * @param nations {Array<NationType>} an list of nations
 * @param id {number} the id of the nation
 * @returns {*|ReactWrapper|ConfigT|ShallowWrapper}
 */
export function resolveNation(nations:Array<NationType>, id:number) {
  return _.find(nations, (nation) => nation.id === id);
}

/**
 * @define NationStatus
 * @property {string} key the translation key of the status
 * @property {number} the type of the status 0 = unknown | 200 = success | 300 = failed | 400 = succeed (take a look at the transaction queue for the status codes)
 */
type NationStatus = {
  key: string,
  type: 0 | 200 | 300 | 400
}

/**
 * @desc Takes a nation and return's the status that should be displayed to the user
 * @param nation
 * @returns {Object}
 */
export function resolveStatus(nation: NationType): NationStatus {
  if(!nation.tx){
    return {
      key: 'draft',
      type: 0
    };
  }

  return {
    key: `${nation.tx.type}.${nation.tx.status}`,
    type: nation.tx.status
  }

}

/**
 * @todo need's rewrite of the param's
 * @param nationData
 * @returns {{virtualNation: *, governanceService: (*|string|undefined|JoinEffectDescriptor)}}
 */
export function convertToDatabase(nationData:any) {
  return {
    ...nationData,
    // @todo Fix virtual nation save unselected state
    virtualNation: nationData.virtualNation === null ? true : nationData.virtualNation,
    governanceService: nationData.governanceService.join(', '),
  };
}

/**
 * @todo need's rewrite of the param's
 * @param nation
 * @returns {{governanceService: (Array|*)}}
 */
export function convertFromDatabase(nation:any) {
  return {
    ...nation,
    // @todo Fix virtual nation save unselected state
    governanceService: nation.governanceService.split(', '),
  };
}

/**
 * @todo need's rewrite of the param's
 * @param nation
 * @returns {boolean}
 */
export function nationIsValid(nation:any) {
  if (_.isEmpty(nation.nationName)) return false;
  if (_.isEmpty(nation.nationDescription)) return false;
  if (nation.virtualNation === null || nation.virtualNation === undefined) return false;
  if (_.isEmpty(nation.nationCode)) return false;
  if (_.isEmpty(nation.lawEnforcementMechanism)) return false;
  if (_.isEmpty(nation.decisionMakingProcess)) return false;
  if (_.isEmpty(nation.governanceService)) return false;

  return true;
}
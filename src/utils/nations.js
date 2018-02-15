//@flow

import _ from 'lodash';

export function resolveNation(nations, id) {
  return _.find(nations, (nation) => nation.id === id);
}

type nationStatus = 'draft' | 'pending' | 'rejected' | 'accepted'
export function resolveStatus(nation): nationStatus {
  if (nation.created) {
    return 'accepted';
  }
  if (nation.txHash) {
    return 'pending';
  }

  return 'draft';
}

export function convertToDatabase(nationData) {
  return {
    ...nationData,
    // @todo Fix virtual nation save unselected state
    virtualNation: nationData.virtualNation === null ? true : nationData.virtualNation,
    governanceService: nationData.governanceService.join(', '),
  };
}

export function convertFromDatabase(nation) {
  return {
    ...nation,
    // @todo Fix virtual nation save unselected state
    governanceService: nation.governanceService.split(', '),
  };
}

export function nationIsValid(nation) {
  if (_.isEmpty(nation.nationName)) return false;
  if (_.isEmpty(nation.nationDescription)) return false;
  if (nation.virtualNation === null || nation.virtualNation === undefined) return false;
  if (_.isEmpty(nation.nationCode)) return false;
  if (_.isEmpty(nation.lawEnforcementMechanism)) return false;
  if (_.isEmpty(nation.decisionMakingProcess)) return false;
  if (_.isEmpty(nation.governanceService)) return false;

  return true;
}
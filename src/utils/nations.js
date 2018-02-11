import _ from 'lodash';

export function resolveNation(nations, id) {
  return _.find(nations, (nation) => nation.id === id);
}

export function convertNation(nationData) {
  return {
    ...nationData,
    // @todo Fix virtual nation save unselected state
    virtualNation: nationData.virtualNation === null ? true : nationData.virtualNation,
    governanceService: nationData.governanceService.join(' '),
  };
}
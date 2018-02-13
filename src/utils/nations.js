import _ from 'lodash';

export function resolveNation(nations, id) {
  return _.find(nations, (nation) => nation.id === id);
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
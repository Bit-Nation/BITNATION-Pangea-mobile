import _ from 'lodash';

export function resolveNation(nations, id) {
  return _.find(nations, (nation) => nation.id === id);
}
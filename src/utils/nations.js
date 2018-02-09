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
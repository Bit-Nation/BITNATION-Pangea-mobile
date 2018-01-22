import _ from 'lodash';

export function compressMnemonic(mnemonic) {
  return _.join(mnemonic, ' ');
}
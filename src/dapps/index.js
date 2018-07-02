// @flow

import * as React from 'react';
import sendReceiveDApp from './sendReceiveMoney';

export type DAppType = {
  name: string,
  identityPublicKey: string,
  modal: React.ComponentType<any>,
  message: React.ComponentType<any>,
}

const dApps: Array<DAppType> = [
  sendReceiveDApp,
];
export default dApps;

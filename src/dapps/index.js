// @flow

import * as React from 'react';
import sendReceiveDApp from './sendMoney';
import { DAppProvider } from '../components/nativeDApps/DAppProvider';
import { MessageProvider } from '../components/nativeDApps/MessageProvider';

export type DAppType = {
  name: string,
  identityPublicKey: string,
  modal: React.ComponentType<any>,
  message: React.ComponentType<any>,
}

const dApps: Array<DAppType> = [
  sendReceiveDApp,
];

export default dApps.map(dApp => ({
  name: dApp.name,
  identityPublicKey: dApp.identityPublicKey,
  // $FlowFixMe
  modal: DAppProvider(dApp.modal),
  // $FlowFixMe
  message: MessageProvider(dApp.message),
}));

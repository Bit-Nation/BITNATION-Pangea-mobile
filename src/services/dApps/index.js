// @flow

import { NativeModules } from 'react-native';

import type { DAppType as DBDApp } from '../../services/database/schemata';
import { convertToPanthalassa } from '../../utils/mapping/dapp';

const DAPP_START_TIMEOUT = 30;

export default class DAppsService {
  static async startDApp(dApp: DBDApp): Promise<boolean> {
    const { Panthalassa } = NativeModules;
    return Panthalassa.PanthalassaStartDApp({
      dApp: JSON.stringify(convertToPanthalassa(dApp)),
      timeout: DAPP_START_TIMEOUT,
    });
  }

  static async openDApp(publicKey: string, context: Object): Promise<boolean> {
    const { Panthalassa } = NativeModules;
    return Panthalassa.PanthalassaOpenDApp({
      id: publicKey,
      context: JSON.stringify(context),
    });
  }

  static async connectToDAppHost(address: string): Promise<boolean> {
    const { Panthalassa } = NativeModules;
    return Panthalassa.PanthalassaConnectToDAppDevHost({ address });
  }

  static async performDAppCallback(dappPublicKey: string, id: number, params: Object) {
    const { Panthalassa } = NativeModules;
    return Panthalassa.PanthalassaCallDAppFunction({
      dAppId: dappPublicKey,
      id,
      args: JSON.stringify(params),
    });
  }
}

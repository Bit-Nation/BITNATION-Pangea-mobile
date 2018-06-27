// @flow

import { NativeModules } from 'react-native';

import type { DApp } from '../../types/DApp';

export default class DAppsService {
  static async startDApp(dApp: DApp): Promise<boolean> {
    const { Panthalassa } = NativeModules;
    return Panthalassa.PanthalassaStartDApp(JSON.stringify(dApp));
  }

  static async openDApp(publicKey: string): Promise<boolean> {
    const { Panthalassa } = NativeModules;
    return Panthalassa.PanthalassaOpenDApp(publicKey);
  }

  static async connectToDAppHost(address: string): Promise<boolean> {
    const { Panthalassa } = NativeModules;
    return Panthalassa.PanthalassaConnectToDAppDevHost({ address });
  }

  // async renderDAppMessage(publicKey: string, message: )
}

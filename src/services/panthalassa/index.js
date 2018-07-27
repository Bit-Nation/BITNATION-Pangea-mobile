// @flow

import { NativeModules } from 'react-native';

const { Panthalassa } = NativeModules;

export default class PanthalassaService {
  static async stop(): Promise<void> {
    return Panthalassa.PanthalassaStop();
  }

  static async start(config: String, password: String):Promise<boolean> {
    return Panthalassa.PanthalassaStart({ config, password });
  }

  static async startFromMnemonic(config: String, mnemonic: String):Promise<boolean> {
    return Panthalassa.PanthalassaStartFromMnemonic({ config, mnemonic });
  }

  static async isValidMnemonic(mnemonic: String):Promise<boolean> {
    return Panthalassa.PanthalassaIsValidMnemonic(mnemonic);
  }

  static async newAccountKeys(password: String):Promise<string> {
    return Panthalassa.PanthalassaNewAccountKeys({
      pw: password,
      pwConfirm: password,
    });
  }

  static async newAccountKeysFromMnemonic(password: String, mnemonic: String):Promise<string> {
    return Panthalassa.PanthalassaNewAccountKeysFromMnemonic({
      mne: mnemonic,
      pw: password,
      pwConfirm: password,
    });
  }

  static async exportAccountStore(password: String):Promise<string> {
    return Panthalassa.PanthalassaExportAccountStore({
      pw: password,
      pwConfirm: password,
    });
  }

  static async getEthPrivateKey():Promise<string> {
    return Panthalassa.PanthalassaEthPrivateKey();
  }

  static async ethPubToAddress(publicKey: String):Promise<string> {
    return Panthalassa.PanthalassaEthPubToAddress(publicKey);
  }

  static async ethAddress():Promise<string> {
    return Panthalassa.PanthalassaEthAddress();
  }

  static async getIdentityPublicKey():Promise<string> {
    return Panthalassa.PanthalassaGetIdentityPublicKey();
  }

  static async signProfileStandAlone(name: String, location: String, image: String, keyManagerStore: String, password: String):Promise<string> {
    return Panthalassa.PanthalassaSignProfileStandAlone({
      name,
      location,
      image,
      keyManagerStore,
      password,
    });
  }

  static async signProfile(name: String, location: String, image: String):Promise<string> {
    return Panthalassa.PanthalassaSignProfile({
      name,
      location,
      image,
    });
  }

  static async getMnemonic():Promise<string> {
    return Panthalassa.PanthalassaGetMnemonic();
  }

  static async startDApp(dApp: String, timeout: Number):Promise<boolean> {
    return Panthalassa.PanthalassaStartDApp({
      dApp,
      timeout,
    });
  }

  static async openDApp(id: String, context: String):Promise<boolean> {
    return Panthalassa.PanthalassaOpenDApp({
      id,
      context,
    });
  }

  static async newPreKeyBundle():Promise<string> {
    return Panthalassa.PanthalassaNewPreKeyBundle();
  }

  static async callDAppFunction(dAppId: String, id: Number, args: String):Promise<boolean> {
    return Panthalassa.PanthalassaCallDAppFunction({
      dAppId,
      id,
      args,
    });
  }

  static async connectToDAppDevHost(address: String):Promise<boolean> {
    return Panthalassa.PanthalassaConnectToDAppDevHost(address);
  }

  static async createDAppMessage(rawMsg: String, secretID: String, secret: String, receiverIdKey:String):Promise<string> {
    return Panthalassa.PanthalassaCreateDAppMessage({
      rawMsg,
      secretID,
      secret,
      receiverIdKey,
    });
  }

  static async initializeChat(identityPublicKey: String, preKeyBundle: String):Promise<string> {
    return Panthalassa.PanthalassaInitializeChat({
      identityPublicKey,
      preKeyBundle,
    });
  }

  static async handleInitialMessage(message: String, preKeyBundlePrivatePart: String):Promise<string> {
    return Panthalassa.PanthalassaHandleInitialMessage({
      message,
      preKeyBundlePrivatePart,
    });
  }

  static async createHumanMessage(rawMsg: String, secretID: String, secret: String, receiverIdKey: String):Promise<string> {
    return Panthalassa.PanthalassaCreateHumanMessage({
      rawMsg,
      secretID,
      secret,
      receiverIdKey,
    });
  }

  static async decryptMessage(message: String, secret: String):Promise<string> {
    return Panthalassa.PanthalassaDecryptMessage({
      message,
      secret,
    });
  }

  static async renderMessage(id: String, msg: String, context: String):Promise<string> {
    return Panthalassa.PanthalassaRenderMessage({
      id,
      msg,
      context,
    });
  }

  static async sendResponse(id: String, data: String, responseError: String, timeout: Number):Promise<boolean> {
    return Panthalassa.PanthalassaSendResponse({
      id,
      data,
      responseError,
      timeout,
    });
  }
}

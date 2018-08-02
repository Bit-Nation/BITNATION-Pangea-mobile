// @flow

import { NativeModules } from 'react-native';

const { Panthalassa } = NativeModules;

/**
 * @desc Stops Panthalassa instance
 * @returns {Promise<*>} Boolean response about operation's state
 */
export async function panthalassaStop(): Promise<boolean> {
  return Panthalassa.PanthalassaStop();
}

/**
 * @desc Starts Panthalassa instance from configurationStore and password as data
 * @param {string} config Account's ConfigurationStore
 * @param {string} password Account's password
 * @returns {Promise<*>} Boolean response about operation's result
 */
export async function panthalassaStart(config: String, password: String):Promise<boolean> {
  return Panthalassa.PanthalassaStart({ config, password });
}

/**
 * @desc Starts Panthalassa instance from configurationStore and mnemonic phrase as data
 * @param {string} config Account's ConfigurationStore
 * @param {string} mnemonic Account's mnemonic phrase to recover it
 * @returns {Promise<*>} Boolean response about operation's result
 */
export async function panthalassaStartFromMnemonic(config: String, mnemonic: String):Promise<boolean> {
  return Panthalassa.PanthalassaStartFromMnemonic({ config, mnemonic });
}

/**
 * @desc Validates if a mnemonic phrase is valid
 * @param {string} mnemonic Phrase to restore account
 * @returns {Promise<*>} Boolean response about operation's result
 */
export async function panthalassaIsValidMnemonic(mnemonic: String):Promise<boolean> {
  return Panthalassa.PanthalassaIsValidMnemonic(mnemonic);
}

/**
 * @desc Creates new accounts keys (Account ConfigurationStore) from password as data
 * @param {string} password Account's password
 * @returns {Promise<*>} {string} Account's new account ConfigurationStore
 */
export async function panthalassaNewAccountKeys(password: String):Promise<string> {
  return Panthalassa.PanthalassaNewAccountKeys({
    pw: password,
    pwConfirm: password,
  });
}

/**
 * @desc Creates new accounts keys (Account ConfigurationStore) from mnemonic/password as data
 * @param {string} password Account's password
 * @param {string} mnemonic Account's mnemonic
 * @returns {Promise<*>} {string} Account's new account ConfigurationStore
 */
export async function panthalassaNewAccountKeysFromMnemonic(password: String, mnemonic: String):Promise<string> {
  return Panthalassa.PanthalassaNewAccountKeysFromMnemonic({
    mne: mnemonic,
    pw: password,
    pwConfirm: password,
  });
}

/**
 * @desc Exports Account's accounts keys (Account ConfigurationStore) from password as data
 * @param {string} password Account's password
 * @returns {Promise<*>} {string} Account's account ConfigurationStore
 */
export async function panthalassaExportAccountStore(password: String):Promise<string> {
  return Panthalassa.PanthalassaExportAccountStore({
    pw: password,
    pwConfirm: password,
  });
}

/**
 * @desc Retrieves Account's Ethereum private key
 * @returns {Promise<*>} {string} Account's Ethereum private key
 */
export async function panthalassaEthPrivateKey():Promise<string> {
  return Panthalassa.PanthalassaEthPrivateKey();
}

/**
 * @desc Converts Account's Ethereum public key to an address
 * @param {string} publicKey User's public key
 * @returns {Promise<*>} {string} Account's Ethereum public key
 */
export async function panthalassaEthPubToAddress(publicKey: String):Promise<string> {
  return Panthalassa.PanthalassaEthPubToAddress(publicKey);
}

/**
 * @desc Retrieves Account's Ethereum address
 * @returns {Promise<*>} {string} An address
 */
export async function panthalassaEthAddress():Promise<string> {
  return Panthalassa.PanthalassaEthAddress();
}

/**
 * @desc Retrieves Account's public ey
 * @returns {Promise<*>} {string} Account's public key
 */
export async function panthalassaGetIdentityPublicKey():Promise<string> {
  return Panthalassa.PanthalassaGetIdentityPublicKey();
}

/**
 * @desc Creates Account's signed profile
 * @param {string} name Profile's name to show
 * @param {string} location Profile's location
 * @param {string} image Profile's avatar
 * @param {string} keyManagerStore Account's ConfigurationStore
 * @param {string} password Account's password
 * @returns {Promise<*>} {string} Account's signed profile
 */
export async function panthalassaSignProfileStandAlone(name: String, location: String, image: String, keyManagerStore: String, password: String):Promise<string> {
  return Panthalassa.PanthalassaSignProfileStandAlone({
    name,
    location,
    image,
    keyManagerStore,
    password,
  });
}

/**
 * @desc Updates information to the Account's profile
 * @param {string} name Profile's name to show
 * @param {string} location Profile's location
 * @param {string} image Profile's avatar
 * @returns {Promise<*>} {
 */
export async function panthalassaSignProfile(name: String, location: String, image: String):Promise<string> {
  return Panthalassa.PanthalassaSignProfile({
    name,
    location,
    image,
  });
}

/**
 * @desc Retrieves Account's mnemonic phrase
 * @returns {Promise<*>} {string} Mnemonic phrase
 */
export async function panthalassaGetMnemonic():Promise<string> {
  return Panthalassa.PanthalassaGetMnemonic();
}

/**
 * @desc Starts DApp's VM
 * @param {string} dApp DApp's Identifier
 * @param {string} timeout Value for timeout operation
 * @returns {Promise<*>} Boolean response about operation's result
 */
export async function panthalassaStartDApp(dApp: String, timeout: Number):Promise<boolean> {
  return Panthalassa.PanthalassaStartDApp({
    dApp,
    timeout,
  });
}

/**
 * @desc Opens an specific Dapp
 * @param {string} id DApp's Id
 * @param {string} context TODO
 * @returns {Promise<*>} Boolean response about operation's result
 */
export async function panthalassaOpenDApp(id: String, context: String):Promise<boolean> {
  return Panthalassa.PanthalassaOpenDApp({
    id,
    context,
  });
}

/**
 * @desc TODO
 * @returns {Promise<*>} TODO
 */
export async function panthalassaNewPreKeyBundle():Promise<string> {
  return Panthalassa.PanthalassaNewPreKeyBundle();
}

/**
 * @desc Calls a DApp's function over th VM
 * @param {string} dAppId TODO
 * @param {string} id TODO
 * @param {string} args TODO
 * @returns {Promise<*>} Boolean response about operation's result
 */
export async function panthalassaCallDAppFunction(dAppId: String, id: Number, args: String):Promise<boolean> {
  return Panthalassa.PanthalassaCallDAppFunction({
    dAppId,
    id,
    args,
  });
}

/**
 * @desc TODO
 * @param {string} address TODO
 * @returns {Promise<*>} TODO
 */
export async function panthalassaConnectToDAppDevHost(address: String):Promise<boolean> {
  return Panthalassa.PanthalassaConnectToDAppDevHost(address);
}

/**
 * @desc TODO
 * @param {string} rawMsg TODO
 * @param {string} secretID TODO
 * @param {string} secret TODO
 * @param {string} receiverIdKey TODO
 * @returns {Promise<*>} TODO
 */
export async function panthalassaCreateDAppMessage(rawMsg: String, secretID: String, secret: String, receiverIdKey:String):Promise<string> {
  return Panthalassa.PanthalassaCreateDAppMessage({
    rawMsg,
    secretID,
    secret,
    receiverIdKey,
  });
}

/**
 * @desc TODO
 * @param {string} identityPublicKey TODO
 * @param {string} preKeyBundle TODO
 * @returns {Promise<*>} {string} TODO
 */
export async function panthalassaInitializeChat(identityPublicKey: String, preKeyBundle: String):Promise<string> {
  return Panthalassa.PanthalassaInitializeChat({
    identityPublicKey,
    preKeyBundle,
  });
}

/**
 * @desc TODO
 * @param {string} message TODO
 * @param {string} preKeyBundlePrivatePart TODO
 * @returns {Promise<*>} {string} TODO
 */
export async function panthalassaHandleInitialMessage(message: String, preKeyBundlePrivatePart: String):Promise<string> {
  return Panthalassa.PanthalassaHandleInitialMessage({
    message,
    preKeyBundlePrivatePart,
  });
}

/**
 * @desc TODO
 * @param {string} rawMsg TODO
 * @param {string} secretID TODO
 * @param {string} secret TODO
 * @param {string} receiverIdKey TODO
 * @returns {Promise<*>} {string}
 */
export async function panthalassaCreateHumanMessage(rawMsg: String, secretID: String, secret: String, receiverIdKey: String):Promise<string> {
  return Panthalassa.PanthalassaCreateHumanMessage({
    rawMsg,
    secretID,
    secret,
    receiverIdKey,
  });
}

/**
 * @desc TODO
 * @param {string} message TODO
 * @param {string} secret TODO
 * @returns {Promise<*>} {string} TODO
 */
export async function panthalassaDecryptMessage(message: String, secret: String):Promise<string> {
  return Panthalassa.PanthalassaDecryptMessage({
    message,
    secret,
  });
}

/**
 * @desc TODO
 * @param {string} id TODO
 * @param {string} msg TODO
 * @param {string} context TODO
 * @returns {Promise<*>} {string}
 */
export async function panthalassaRenderMessage(id: String, msg: String, context: String):Promise<string> {
  return Panthalassa.PanthalassaRenderMessage({
    id,
    msg,
    context,
  });
}

/**
 * @desc TODO
 * @param {string} id TODO
 * @param {string} data TODO
 * @param {string} responseError TODO
 * @param {string} timeout TODO
 * @returns {Promise<*>} {string} TODO
 */
export async function panthalassaSendResponse(id: String, data: String, responseError: String, timeout: Number):Promise<boolean> {
  return Panthalassa.PanthalassaSendResponse({
    id,
    data,
    responseError,
    timeout,
  });
}

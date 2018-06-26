import type { ProfileType, PreKeyBundleType } from '../types/Chat';

export const SHOW_CHAT_SPINNER = 'SHOW_CHAT_SPINNER';
export const HIDE_CHAT_SPINNER = 'HIDE_CHAT_SPINNER';
export const FIND_USER_BY_KEY = 'FIND_USER_BY_KEY';
export const SAVE_PROFILE = 'SAVE_PROFILE';
export const SAVE_PRE_KEY_BUNDLE = 'SAVE_PRE_KEY_BUNDLE';

export type ShowSpinnerAction = { +type: 'SHOW_CHAT_SPINNER' };
export type HideSpinnerAction = { +type: 'HIDE_CHAT_SPINNER' };
export type FindUserByPubKeyAction = {
  +type: 'FIND_USER_BY_KEY',
  +key: string
};
export type SaveProfileAction = {
  +type: 'SAVE_PROFILE',
  +profile: ProfileType
};
export type SavePreKeyBundleAction = {
  +type: 'SAVE_PRE_KEY_BUNDLE',
  +profile: PreKeyBundleType
};

export type Action =
  | ShowSpinnerAction
  | HideSpinnerAction
  | FindUserByPubKeyAction
  | SaveProfileAction
  | SavePreKeyBundleAction;

/**
 * @desc Action for an action that shows spinner while processing in background
 * @returns {ShowSpinnerAction} An action.
 */
export function showSpinner(): ShowSpinnerAction {
  return {
    type: SHOW_CHAT_SPINNER,
  };
}

/**
 * @desc Action for an action that hide spinner after the process is completed
 * @returns {HideSpinnerAction} An action.
 */
export function hideSpinner(): HideSpinnerAction {
  return {
    type: HIDE_CHAT_SPINNER,
  };
}

/**
 * @desc Action for an action that find a user to chat with
 * @param {string} key Public key of the user
 * @returns {FindUserByPubKeyAction} An action.
 */
export function findUserByPublicKey(key: string): FindUserByPubKeyAction {
  return {
    type: FIND_USER_BY_KEY,
    key,
  };
}

/**
 * @desc Action for saving a user profile into database
 * @param {Object} profileObject profile object
 * @returns {SaveProfileAction} An action.
 */
export function saveProfile(profileObject: Object): SaveProfileAction {
  const profile = {
    name: profileObject.information.name,
    location: profileObject.information.location,
    image: profileObject.information.image,
    identity_pub_key: profileObject.information.identity_pub_key,
    ethereum_pub_Key: profileObject.information.ethereum_pub_Key,
    chat_id_key: profileObject.information.chat_id_key,
    timestamp: profileObject.information.timestamp,
    version: profileObject.information.version,
    identity_key_signature: profileObject.information.identity_key_signature,
    ethereum_key_signature: profileObject.information.ethereum_key_signature,
  };
  return {
    type: SAVE_PROFILE,
    profile,
  };
}

/**
 * @desc Action for saving a pre key bundle into database
 * @param {Object} bundle Pre key bundle object
 * @returns {SavePreKeyBundleAction} An action.
 */
export function savePreKeyBundle(bundle: Object): SavePreKeyBundleAction {
  const preKeyBundle = {

  };
  return {
    type: SAVE_PRE_KEY_BUNDLE,
    preKeyBundle,
  };
}

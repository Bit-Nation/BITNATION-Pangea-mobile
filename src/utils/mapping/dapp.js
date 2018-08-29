// @flow
// $FlowFixMe
import { Buffer } from 'buffer';
import type { DApp, PanthalassaDApp } from '../../types/DApp';

/**
 * @desc Converts DApp from Panthalassa representation.
 * @param {DApp} dApp DApp to convert.
 * @param {string} locale Locale to DApp localization.
 * @return {Object} Converted DApp object.
 */
export function convertFromPanthalassa(dApp: PanthalassaDApp, locale: string = 'en-us'): DApp {
  const hexPublicKey = Buffer.from(dApp.used_signing_key, 'base64').toString('hex');
  return {
    name: dApp.name[locale] || dApp.name['en-us'],
    publicKey: hexPublicKey,
  };
}

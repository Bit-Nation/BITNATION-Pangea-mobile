// @flow

// $FlowFixMe Flow has issues with import buffer for some reason.
import { Buffer } from 'buffer';
import type { DApp } from '../../types/DApp';

/**
 * @desc Converts DApp to Panthalassa representation.
 * @param {DApp} dApp DApp to convert.
 * @return {Object} Converted DApp object.
 */
export function convertToPanthalassa(dApp: DApp) {
  return {
    name: dApp.name,
    code: dApp.code,
    signature_public_key: Buffer.from(dApp.publicKey, 'hex').toString('base64'),
    signature: Buffer.from(dApp.signature, 'hex').toString('base64'),
  };
}

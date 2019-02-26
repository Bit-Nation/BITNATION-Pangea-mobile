// @flow

import type { Document, PanthalassaDocument, PanthalassaInputDocument } from './Documents-types';

/**
 * @desc Converts document from Panthalassa representation.
 * @param {PanthalassaDocument} data Data to convert from.
 * @param {string} dataId Id of content stored.
 * @return {Document} Converted document.
 */
export function convertFromPanthalassa(data: PanthalassaDocument, dataId: string): Document {
  return {
    id: data.id,
    name: data.title,
    description: data.description,
    txHash: data.tx_hash === '' ? null : data.tx_hash,
    signature: data.signature,
    dataId,
    mimeType: data.mime_type,
    docHash: data.hash,
  };
}

/**
 * @desc Converts document to Panthalassa representation.
 * @param {Document} document Document to convert.
 * @param {string} content Base64 document content.
 * @return {PanthalassaInputDocument} Converted document.
 */
export function convertToPanthalassa(document: Document, content: string): PanthalassaInputDocument {
  return {
    id: document.id,
    title: document.name,
    description: document.description,
    content,
    mime_type: document.mimeType,
  };
}

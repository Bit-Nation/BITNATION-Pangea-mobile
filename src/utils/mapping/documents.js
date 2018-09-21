// @flow

import type { Document, PanthalassaDocument } from '../../types/Documents';

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
    txHash: data.txHash,
    signature: data.signature,
    dataId,
    mimeType: data.mime_type,
  };
}

/**
 * @desc Converts document to Panthalassa representation.
 * @param {Document} document Document to convert.
 * @param {string} content Base64 document content.
 * @return {PanthalassaDocument} Converted document.
 */
export function convertToPanthalassa(document: Document, content: string): PanthalassaDocument {
  return {
    id: document.id,
    title: document.name,
    description: document.description,
    txHash: document.txHash,
    signature: document.signature,
    content,
    mime_type: document.mimeType,
  };
}

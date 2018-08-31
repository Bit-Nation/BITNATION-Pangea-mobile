import type { Document, PanthalassaDocument } from '../../types/Documents';

/**
 * @desc Converts document from Panthalassa representation.
 * @param {PanthalassaDocument} data Data to convert from.
 * @return {Document} Converted document.
 */
export function convertFromPanthalassa(data: PanthalassaDocument): Document {
  return {
    id: data.id,
    name: data.title,
    description: data.description,
    data: data.content,
    mimeType: data.mime_type,
  };
}

/**
 * @desc Converts document to Panthalassa representation.
 * @param {Document} document Document to convert.
 * @return {PanthalassaDocument} Converted document.
 */
export function convertToPanthalassa(document: Document): PanthalassaDocument {
  return {
    id: document.id,
    title: document.name,
    description: document.description,
    content: document.data,
    mime_type: document.mimeType,
  };
}

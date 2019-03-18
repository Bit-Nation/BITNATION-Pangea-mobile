// @flow

import uuid from 'uuid4';

import { convertFromPanthalassa, convertToPanthalassa } from './documents-utils';
import type { Document, PanthalassaDocument } from './documents-types';
import * as Panthalassa from '@pangea/panthalassa';

/**
 * @desc Class to store documents content aside from Redux state to improve performance.
 */
class ContentStorage {
  contents: {};

  /**
   * @desc Stores provided content on the storage.
   * @param {string} data Base64 data to store.
   * @return {string} Id of newly stored data.
   */
  storeContent(data: string): string {
    const id = uuid();
    this.contents[id] = data;

    return id;
  }

  /**
   * @desc Removes content from storage.
   * @param {string} id Id of stored content.
   * @return {void}
   */
  removeContent(id: string) {
    delete this.contents[id];
  }

  /**
   * @desc Gets content from storage.
   * @param {string} id Id of stored content.
   * @return {?string} Content if available or undefined.
   */
  resolveContent(id: string): string {
    return this.contents[id];
  }

  /**
   * @desc Function to clear all storage.
   * @return {void}
   */
  clear() {
    this.contents = {};
  }
}

export const contentStorage = new ContentStorage();

export default class DocumentService {
  static async getDocuments(): Promise<Array<Document>> {
    const documents = await Panthalassa.panthalassaCall('DOCUMENT:ALL');
    const parsed = JSON.parse(documents);
    // Clean old documents because we're re-registering them all.
    contentStorage.clear();
    return parsed.docs.map((document: PanthalassaDocument) => convertFromPanthalassa(document, contentStorage.storeContent(document.content)));
  }

  static async saveDocument(document: Document): Promise<void> {
    await Panthalassa.panthalassaCall('DOCUMENT:CREATE', convertToPanthalassa(document, contentStorage.resolveContent(document.dataId)));
  }

  static async updateDocument(document: Document): Promise<void> {
    const converted = convertToPanthalassa(document, '');
    await Panthalassa.panthalassaCall('DOCUMENT:UPDATE', {
      doc_id: converted.id,
      title: converted.title,
      description: converted.description,
    });
  }

  static async deleteDocument(documentId: number): Promise<void> {
    await Panthalassa.panthalassaCall('DOCUMENT:DELETE', { doc_id: documentId });
  }

  static async uploadDocument(documentId: number): Promise<void> {
    await Panthalassa.panthalassaCall('DOCUMENT:NOTARISE', { doc_id: documentId });
  }
}


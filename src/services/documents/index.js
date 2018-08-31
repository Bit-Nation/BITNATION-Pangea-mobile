// @flow

import { convertFromPanthalassa, convertToPanthalassa } from '../../utils/mapping/documents';
import type { Document } from '../../types/Documents';
import * as Panthalassa from '../panthalassa';


export default class DocumentService {
  static async getDocuments(): Promise<Array<Document>> {
    const documents = await Panthalassa.panthalassaCall('DOCUMENT:ALL');
    const parsed = JSON.parse(documents);
    return parsed.docs.map(convertFromPanthalassa);
  }

  static async saveDocument(document: Document): Promise<void> {
    await Panthalassa.panthalassaCall('DOCUMENT:CREATE', convertToPanthalassa(document));
  }
}

// @flow

import type { Contact } from '../../types/Contacts';
import * as Panthalassa from '../panthalassa';

export default class ContactService {
  static async getContacts(): Promise<Array<Contact>> {
    const contacts = await Panthalassa.panthalassaCall('CONTACT:ALL');
    const parsed = JSON.parse(contacts);
    return parsed.contacts;
  }

  static async addContact(identityKey: string): Promise<void> {
    await Panthalassa.panthalassaCall('CONTACT:CREATE', { identity_key: identityKey });
  }
}


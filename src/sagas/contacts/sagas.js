// @flow

import {
  call,
  put,
} from 'redux-saga/effects';
import ContactsService from '../../services/contacts';
import {
  startContactsFetch,
  contactsFetchFailed,
  contactsUpdated,
} from '../../actions/contacts';
import { getProfile } from '../chat/sagas';
import type { AddContactAction } from '../../actions/contacts';
import type { Contact } from '../../types/Contacts';

/**
 * @desc Fetch list of contacts.
 * @return {void}
 */
export function* fetchContacts(): Generator<*, *, *> {
  try {
    yield put(startContactsFetch());
    const contactsKeys: Array<{ identity_key: string }> = yield call(ContactsService.getContacts);
    const contacts: Array<Contact> = [];
    for (let index = 0; index < contactsKeys.length; index += 1) {
      const { identity_key: identityKey } = contactsKeys[index];
      // We're sure that getProfile here is not going to do network request in normal cases.
      // However, if somehow consistency is broken and we don't have profile for specified contact, it will be loaded
      const profile = yield call(getProfile, identityKey);
      if (profile != null) {
        contacts.push({ profile });
      }
      // If there is no profile on database and we failed to fetch it from the network, it's a total fail, and we just skip the contact.
    }
    yield put(contactsUpdated(contacts));
  } catch (error) {
    console.log(`[CONTACTS] Failed to fetch contacts with error ${error.message}`);
    yield put(contactsFetchFailed(error));
  }
}

/**
 * @desc Add a new contact.
 * @param {AddContactAction} action An Action
 * @return {void}
 */
export function* addNewContact(action: AddContactAction): Generator<*, *, *> {
  const { identityKey, callback } = action;
  try {
    const profile = yield call(getProfile, identityKey);
    if (profile) {
      yield call(ContactsService.addContact(identityKey));
      yield call(callback, null);
      yield put(fetchContacts);
    }
  } catch (error) {
    console.log(`[CONTACTS] Failed to add contact with identity key ${identityKey} with error ${error.message}`);
    yield call(callback, error);
  }
}

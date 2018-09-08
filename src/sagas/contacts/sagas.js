// @flow

import {
  call,
  put,
} from 'redux-saga/effects';
import ContactsService from '../../services/contacts';
import {
  contactsFetchFailed,
  contactsUpdated,
} from '../../actions/contacts';
import { getProfile } from '../chat/sagas';
import type { AddContactAction } from '../../actions/contacts';

/**
 * @desc Fetch list of contacts.
 * @return {void}
 */
export function* fetchContacts(): Generator<*, *, *> {
  try {
    const contacts = yield call(ContactsService.getContacts);
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

    if (profile == null) {
      throw new Error('Trying to add contact, but profile is not on database');
    }
    yield call(ContactsService.addContact, identityKey);
    yield call(callback, null);
    yield put(fetchContacts);
  } catch (error) {
    console.log(`[CONTACTS] Failed to add contact with identity key ${identityKey} with error ${error.message}`);
    yield call(callback, error);
  }
}

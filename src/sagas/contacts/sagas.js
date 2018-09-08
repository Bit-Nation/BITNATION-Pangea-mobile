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
  addContact,
} from '../../actions/contacts';
import { getProfile } from '../../actions/chat';
import type { AddContactAction } from '../../actions/contacts';

/**
 * @desc Fetch list of contacts.
 * @return {void}
 */
export function* fetchContacts(): Generator<*, *, *> {
  try {
    yield put(startContactsFetch());
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
  const { identityKey } = action;
  try {
    yield call(getProfile(identityKey, (result, error) => {
      if (result) {
        ContactsService.addContact(identityKey);
        addContact(identityKey, (err) => {
          console.log('Error adding Contact', err);
        });
      } else {
        console.log('Error fetching profile', error);
      }
    }));
    yield call(fetchContacts);
  } catch (error) {
    console.log(`[CONTACTS] Failed to add contact with identity key ${identityKey} with error ${error.message}`);
  }
}

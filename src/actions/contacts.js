// @flow

import type { Contact } from '../types/Contacts';

export const START_CONTACTS_FETCH = 'START_CONTACTS_FETCH';
export const CONTACTS_UPDATED = 'CONTACTS_UPDATED';
export const CONTACTS_FETCH_FAILED = 'CONTACTS_FETCH_FAILED';
export const ADD_CONTACT = 'ADD_CONTACT';

export type StartContactsFetchAction = { +type: 'START_CONTACTS_FETCH' };
export type ContactsUpdatedAction = { +type: 'CONTACTS_UPDATED', contacts: Array<Contact> };
export type ContactsFetchFailedAction = { +type: 'CONTACTS_FETCH_FAILED', +error: Error };
export type AddContactAction = { +type: 'ADD_CONTACT', +identityKey: string, callback: (error: Error | null) => void };

export type Action =
  | StartContactsFetchAction
  | ContactsUpdatedAction
  | ContactsFetchFailedAction
  | AddContactAction;

/**
 * @desc Action creator for an action that requests fetch of all contacts.
 * @returns {StartContactsFetchAction} An action
 */
export function startContactsFetch(): StartContactsFetchAction {
  return {
    type: START_CONTACTS_FETCH,
  };
}

/**
 * @desc Action creator for an action that is called when the whole contacts list is updated.
 * @param {Contact[]} contacts New contacts list.
 * @returns {ContactsUpdatedAction} An action
 */
export function contactsUpdated(contacts: Array<Contact>): ContactsUpdatedAction {
  return {
    type: CONTACTS_UPDATED,
    contacts,
  };
}

/**
 * @desc Action creator for an action that is called when contacts fetch failed.
 * @param {Error} error Fetching error
 * @returns {ContactsFetchFailedAction} An action
 */
export function contactsFetchFailed(error: Error): ContactsFetchFailedAction {
  return {
    type: CONTACTS_FETCH_FAILED,
    error,
  };
}

/**
 * @desc Action creator for an action that initiates process of adding contact to contacts list.
 * @param {string} identityKey Identity key of contact to add, hex encoded.
 * @param {function} callback Callback that will be called when contact added or failed to add with an error or null.
 * @returns {AddContactAction} An action
 */
export function addContact(identityKey: string, callback: (error: Error | null) => void): AddContactAction {
  return {
    type: ADD_CONTACT,
    identityKey,
    callback,
  };
}

// @flow

import { call, put } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';

import { addContact, contactsFetchFailed, contactsUpdated, startContactsFetch } from '@pangea/contacts/contacts-actions';
import { addNewContact, fetchContacts } from '../../../sagas/contacts-sagas/sagas';
import { getProfile } from '../../../sagas/chat-sagas/sagas';
import ContactsService from '@pangea/contacts/contacts-service';
import type { ProfileType } from '@pangea/chat/chat-types';

const mockIdentityKey = 'MOCK_IDENTITY_KEY';
const mockProfile: ProfileType = {
  name: 'name',
  location: 'location',
  identityKey: mockIdentityKey,
  ethereumAddress: 'ethereumAddress',
  ethereumPublicKey: 'ethereumPublicKey',
  chatIdKey: 'chatIdKey',
  timestamp: new Date(),
  version: 1,
  image: 'image',
  ethereumKeySignature: 'ethereumKeySignature',
  identityKeySignature: 'identityKeySignature',
};

test('addNewContact', () => {
  const mockCallback = jest.fn();
  const mockAction = addContact(mockIdentityKey, mockCallback);

  const gen = cloneableGenerator(addNewContact)(mockAction);
  expect(gen.next().value).toEqual(call(getProfile, mockIdentityKey));

  const exceptionGen = gen.clone();
  const mockError = new Error('MOCK: Failed to get profile');
  expect(exceptionGen.throw(mockError).value).toEqual(call(mockCallback, mockError));
  expect(exceptionGen.next().done).toBeTruthy();

  const noProfileGen = gen.clone();
  expect(noProfileGen.next(undefined).value).toEqual(call(mockCallback, new Error('Trying to add contact, but profile is not on database')));
  expect(noProfileGen.next().done).toBeTruthy();

  expect(gen.next(mockProfile).value).toEqual(call(ContactsService.addContact, mockIdentityKey));
  expect(gen.next().value).toEqual(call(mockCallback, null));
  expect(gen.next().value).toEqual(put(startContactsFetch()));
});

test('fetchContacts', () => {
  const mockIdentityKey2 = 'MOCK_IDENTITY_KEY_2';

  const mockIdentityKeys = [
    { identity_key: mockIdentityKey },
    { identity_key: mockIdentityKey2 },
  ];

  const gen = cloneableGenerator(fetchContacts)();
  expect(gen.next().value).toEqual(call(ContactsService.getContacts));

  const exceptionGen = gen.clone();
  const mockError = new Error('MOCK: Failed to get contacts');
  expect(exceptionGen.throw(mockError).value).toEqual(put(contactsFetchFailed(mockError)));
  expect(exceptionGen.next().done).toBeTruthy();

  const emptyListGen = gen.clone();
  expect(emptyListGen.next([]).value).toEqual(put(contactsUpdated([])));
  expect(emptyListGen.next().done).toBeTruthy();

  expect(gen.next(mockIdentityKeys).value).toEqual(call(getProfile, mockIdentityKey));
  // We return profile for first request
  expect(gen.next(mockProfile).value).toEqual(call(getProfile, mockIdentityKey2));
  // We return null for second request
  expect(gen.next(null).value).toEqual(put(contactsUpdated([{ profile: mockProfile }])));
  expect(gen.next().done).toBeTruthy();
});

// @flow

import { takeEvery, all } from 'redux-saga/effects';

import rootSaga from '../../../sagas/contacts-sagas';
import { ADD_CONTACT, START_CONTACTS_FETCH } from '@pangea/contacts/contacts-actions';
import { SERVICES_CREATED } from 'pangea-common/serviceContainer-actions';
import { addNewContact, fetchContacts } from '../../../sagas/contacts-sagas/sagas';

test('rootSaga', () => {
  const iterator = rootSaga();
  expect(iterator.next().value).toEqual(all([
    takeEvery([SERVICES_CREATED, START_CONTACTS_FETCH], fetchContacts),
    takeEvery(ADD_CONTACT, addNewContact),
  ]));
});

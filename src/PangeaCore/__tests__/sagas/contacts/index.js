// @flow

import { takeEvery, all } from 'redux-saga/effects';

import rootSaga from '../../../../src/sagas/contacts';
import { ADD_CONTACT, START_CONTACTS_FETCH } from '../../../../src/actions/contacts';
import { SERVICES_CREATED } from '../../../../src/actions/serviceContainer';
import { addNewContact, fetchContacts } from '../../../../src/sagas/contacts/sagas';

test('rootSaga', () => {
  const iterator = rootSaga();
  expect(iterator.next().value).toEqual(all([
    takeEvery([SERVICES_CREATED, START_CONTACTS_FETCH], fetchContacts),
    takeEvery(ADD_CONTACT, addNewContact),
  ]));
});

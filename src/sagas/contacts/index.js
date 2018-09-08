// @flow

import { all, takeEvery } from 'redux-saga/effects';
import { addNewContact, fetchContacts } from './sagas';
import { SERVICES_CREATED } from '../../actions/serviceContainer';
import {
  START_CONTACTS_FETCH,
  ADD_CONTACT,
} from '../../actions/contacts';

/**
 * @desc Root Contacts saga.
 * @return {void}
 */
export default function* rootSaga(): Generator<*, *, *> {
  yield all([
    yield takeEvery([SERVICES_CREATED, START_CONTACTS_FETCH], fetchContacts),
    yield takeEvery(ADD_CONTACT, addNewContact),
  ]);
}

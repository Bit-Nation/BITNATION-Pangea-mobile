// @flow

import { all, takeEvery } from 'redux-saga/effects';
import { addNewContact, fetchContacts } from './sagas';
import { SERVICES_CREATED } from 'pangea-common/serviceContainer-actions';
import {
  START_CONTACTS_FETCH,
  ADD_CONTACT,
} from '../contacts-actions.js';

/**
 * @desc Root contacts saga.
 * @return {void}
 */
export default function* rootSaga(): Generator<*, *, *> {
  yield all([
    takeEvery([SERVICES_CREATED, START_CONTACTS_FETCH], fetchContacts),
    takeEvery(ADD_CONTACT, addNewContact),
  ]);
}

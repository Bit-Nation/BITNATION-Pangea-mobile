// @flow


import { all, call } from 'redux-saga/effects';

import accounts from '@pangea/accounts/accounts-sagas';
import activity from '@pangea/activity/activity-sagas';
import chat from './sagas/chat-sagas';
import navigation from '@pangea/navigation/navigation-sagas';
import key from './sagas/key-sagas';
import settings from './sagas/settings-sagas';
import wallet from '@pangea/wallet/wallet-sagas';
import serviceContainer from './sagas/serviceContainer-sagas';
import modifyNation from '@pangea/nations/modifyNation-sagas';
import nations from '@pangea/nations/nations-sagas';
import txProcessor from '@pangea/nations/txProcessor-sagas';
import dApps from '@pangea/dapps/dapps-sagas';
import migration from '@pangea/migration/migration-sagas';
import upstream from './sagas/upstream-sagas';
import documents from '@pangea/documents/documents-sagas';
import contacts from './sagas/contacts-sagas';

/**
 * @desc Root saga.
 * @return {void}
 */
export default function* rootSaga(): Generator<*, *, *> {
  yield all([
    call(accounts),
    call(activity),
    call(chat),
    call(navigation),
    call(key),
    call(settings),
    call(wallet),
    call(serviceContainer),
    call(modifyNation),
    call(nations),
    call(txProcessor),
    call(migration),
    call(dApps),
    call(migration),
    call(upstream),
    call(documents),
    call(contacts),
  ]);
}

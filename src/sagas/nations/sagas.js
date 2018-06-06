// @flow

import { all, call, put, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { Realm } from 'realm';

import { nationsUpdated, doneFetchNations, fetchNationsStarted, cancelLoading } from '../../actions/nations';
import { NATION_INDEX_PERIOD } from '../../global/Constants';
import { openedNation } from '../../reducers/nations';
import { convertFromDatabase } from '../../utils/nations';
import { errorAlert } from '../../global/alerts';
import ServiceContainer from '../../services/container';
import { NoNationsServiceError } from '../../global/errors/services';
import { currentAccountBasedUpdate } from '../accounts/sagas';
import type { NationType as DBNationType } from '../../services/database/schemata';
import type { State as NationsState } from '../../reducers/nations';

const extractMessage = (error) => {
  if (error.transKey !== undefined) {
    return error;
  }
  if (error.toString().indexOf('insufficient') !== -1) {
    return { transKey: 'insufficientFunds' };
  }
  return error;
};

export const getNations = (state: NationsState) => state.nations;

/**
 * @desc Generator to be called on database change. Used to update nations.
 * @param {*} collection Updated nations collection
 * @return {void}
 */
export function* onCurrentAccountChange(collection: Realm.Result<DBNationType>): Generator<*, *, *> {
  const convertedSettings = collection.map(nation => convertFromDatabase(nation));
  yield put(nationsUpdated(convertedSettings));
}

/**
 * @desc Function that creates Realm results fetching nations for specific account.
 * @param {Realm} db Realm instance.
 * @param {string|null} accountId Id of account to fetch nations or null.
 * @return {Realm.Results<DBNationType>|null} Realm results fetching nations for specified account or null if not applicable.
 */
export function buildAccountNationsResults(db: Realm, accountId: string | null): Realm.Results<DBNationType> | null {
  if (accountId === null) {
    return null;
  }
  return db.objects('Nation').filtered(`accountId == '${accountId}'`);
}

/**
 * @desc Starts listen to nations updates in database.
 * @return {void}
 */
export function* startDatabaseListening(): Generator<*, *, *> {
  yield call(currentAccountBasedUpdate, buildAccountNationsResults, onCurrentAccountChange);
}

/**
 * @desc Starts nations indexing worker that will fetch nations from blockchain.
 * @return {void}
 */
export function* startNationIndexingWorker(): Generator<*, *, *> {
  const { nationsService } = ServiceContainer.instance;
  if (nationsService == null) {
    throw new NoNationsServiceError();
  }

  // @todo Pass block number
  yield put(fetchNationsStarted());
  yield call([nationsService, 'registerNationIndexing'], 0);
  yield put(doneFetchNations());
}

/**
 * @desc Saga for joining nation
 * @return {void}
 */
export function* joinNation(): Generator<*, *, *> {
  try {
    const { nationsService } = ServiceContainer.instance;
    if (nationsService == null) {
      throw new NoNationsServiceError();
    }
    const nationsState = yield select(getNations);
    const currentNation = openedNation(nationsState);
    yield call([nationsService, 'joinNation'], currentNation);
  } catch (e) {
    errorAlert(e);
  } finally {
    yield put(cancelLoading());
  }
}

/**
 * @desc Saga for leaving nation
 * @return {void}
 */
export function* leaveNation(): Generator<*, *, *> {
  try {
    const { nationsService } = ServiceContainer.instance;
    if (nationsService == null) {
      throw new NoNationsServiceError();
    }
    const nationsState = yield select(getNations);
    const currentNation = openedNation(nationsState);
    yield call([nationsService, 'leaveNation'], currentNation);
  } catch (e) {
    errorAlert(e);
  } finally {
    yield put(cancelLoading());
  }
}

/* eslint-disable */

import { all, call, put, select } from 'redux-saga/effects';
import _ from 'lodash';

import { createDraft, updateDraft, deleteDraft, saveAndSubmit, submitDraft } from './serviceFunctions';
import { nationDraftSaveResult, nationDraftDeleteResult, startNationEditing, nationSubmitResult } from '../../actions/modifyNation';
import { nationIsModified } from '../../reducers/modifyNation';
import { requestSyncNations } from '../../actions/nations';

export function* saveDraftSaga(action) {
  const nationData = action.nation;
  try {
    let nation;
    if (nationData.id === undefined) {
      nation = yield call(createDraft, nationData);
    } else {
      nation = yield call(updateDraft, nationData.id, nationData);
    }
    yield put(nationDraftSaveResult(nation.id));
    yield put(startNationEditing(nation));
    yield put(requestSyncNations());
  } catch (error) {
    yield put(nationDraftSaveResult(nationData.id, error));
  } finally {
    if (action.callback) {
      yield call(action.callback);
    }
  }
}

export function* deleteDraftSaga(action) {
  const nationId = action.nationId;
  try {
    yield call(deleteDraft, nationId);
    yield put(nationDraftDeleteResult(nationId));
    yield put(requestSyncNations());
  } catch (error) {
    yield put(nationDraftDeleteResult(nationId, error));
  } finally {
    if (action.callback) {
      yield call(action.callback);
    }
  }
}

export function* submitNationSaga(action) {
  const nationData = action.nation;
  try {
    let nation;
    if (nationData.id === undefined) {
      nation = yield call(saveAndSubmit, nationData);
    } else {
      const state = yield select();
      const isModified = nationIsModified(state.modifyNation);
      if (isModified) {
        yield call(updateDraft, nationData.id, nationData);
      }
      nation = yield call(submitDraft, nationData.id);
    }
    yield put(nationSubmitResult(nation.id));
    yield put(requestSyncNations());
  } catch (error) {
    yield put(nationSubmitResult(nationData.id, error));
  } finally {
    if (action.callback) {
      yield call(action.callback);
    }
  }
}

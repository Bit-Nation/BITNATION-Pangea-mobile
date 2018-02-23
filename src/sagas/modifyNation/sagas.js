import { all, call, put, select } from 'redux-saga/effects';
import _ from 'lodash';

import {} from '../../actions/modifyNation';
import {} from './serviceFunctions';
import { createDraft, updateDraft } from './serviceFunctions';
import { nationDraftSaveResult } from '../../actions/modifyNation';
import { deleteDraft } from './serviceFunctions';
import { nationDraftDeleteResult } from '../../actions/modifyNation';
import { startNationEditing } from '../../actions/modifyNation';
import { saveAndSubmit } from './serviceFunctions';
import { submitDraft } from './serviceFunctions';
import { nationIsModified } from '../../reducers/modifyNation';
import { nationSubmitResult } from '../../actions/modifyNation';
import { requestFetchNations } from '../../actions/nations';

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
    yield put(requestFetchNations());
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
    yield put(requestFetchNations());
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
    yield put(requestFetchNations());
  } catch (error) {
    yield put(nationSubmitResult(nationData.id, error));
  } finally {
    if (action.callback) {
      yield call(action.callback);
    }
  }
}

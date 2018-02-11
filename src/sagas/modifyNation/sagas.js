import { all, call, put, select } from 'redux-saga/effects';
import _ from 'lodash';

import {} from '../../actions/modifyNation';
import {} from './serviceFunctions';
import { createDraft, updateDraft } from './serviceFunctions';
import { nationDraftSaveResult } from '../../actions/modifyNation';

export function* saveDraftSaga(action) {
  const nationData = action.nation;
  try {
    let nation;
    if (nationData.id === undefined) {
      nation = yield call(createDraft, nationData);
    } else {
      nation = yield call(updateDraft, nationData.id, nationData);
    }
    console.log(nation);
    yield put(nationDraftSaveResult(nation.id));
  } catch (error) {
    yield put(nationDraftSaveResult(nationData.id, error));
  } finally {
    if (action.callback) {
      yield call(action.callback);
    }
  }
}

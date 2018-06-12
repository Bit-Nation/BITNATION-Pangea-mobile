// @flow

import { call, put, select } from 'redux-saga/effects';

import { nationDraftSaveResult, nationDraftDeleteResult, startNationEditing, nationSubmitResult } from '../../actions/modifyNation';
import type { SaveNationDraftAction, DeleteNationDraftAction, SubmitNationAction } from '../../actions/modifyNation';
import { nationIsModified } from '../../reducers/modifyNation';
import ServiceContainer from '../../services/container';
import { NoNationsServiceError } from '../../global/errors/services';
import { convertFromDatabase } from '../../utils/nations';

/**
 * @desc Saves draft to database. Updates existing one if present.
 * @param {SaveNationDraftAction} action an Action
 * @returns {void}
 */
export function* saveDraftSaga(action: SaveNationDraftAction): Generator<*, *, *> {
  const nationData = action.nation;
  const { nationsService } = ServiceContainer.instance;
  try {
    if (nationsService == null) {
      throw new NoNationsServiceError();
    }
    let nation;
    if (nationData.id === undefined) {
      nation = yield call([nationsService, 'saveDraft'], nationData);
    } else {
      nation = yield call([nationsService, 'updateDraft'], nationData.id, nationData);
    }
    yield put(nationDraftSaveResult(nation.id));
    yield put(startNationEditing(convertFromDatabase(nation)));
  } catch (error) {
    yield put(nationDraftSaveResult(nationData.id, error));
  } finally {
    if (action.callback) {
      yield call(action.callback);
    }
  }
}

/**
 * @desc Deletes draft from database.
 * @param {DeleteNationDraftAction} action an Action
 * @returns {void}
 */
export function* deleteDraftSaga(action: DeleteNationDraftAction): Generator<*, *, *> {
  const { nationId } = action;
  const { nationsService } = ServiceContainer.instance;
  try {
    if (nationsService == null) {
      throw new NoNationsServiceError();
    }
    yield call([nationsService, 'deleteDraft'], nationId);
    yield put(nationDraftDeleteResult(nationId));
  } catch (error) {
    yield put(nationDraftDeleteResult(nationId, error));
  } finally {
    if (action.callback) {
      yield call(action.callback);
    }
  }
}

/**
 * @desc Submits nation to blockchain.
 * @param {SubmitNationAction} action an Action
 * @returns {void}
 */
export function* submitNationSaga(action: SubmitNationAction): Generator<*, *, *> {
  const nationData = action.nation;
  const { nationsService } = ServiceContainer.instance;
  try {
    if (nationsService == null) {
      throw new NoNationsServiceError();
    }
    let nation;
    if (nationData.id === undefined) {
      nation = yield call([nationsService, 'saveAndSubmit'], nationData);
    } else {
      const state = yield select();
      const isModified = nationIsModified(state.modifyNation);
      if (isModified) {
        yield call([nationsService, 'updateDraft'], nationData.id, nationData);
      }
      nation = yield call([nationsService, 'submitDraft'], nationData.id);
    }
    yield put(nationSubmitResult(nation.id));
  } catch (error) {
    yield put(nationSubmitResult(nationData.id, error));
  } finally {
    if (action.callback) {
      yield call(action.callback);
    }
  }
}

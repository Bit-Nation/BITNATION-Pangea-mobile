// @flow

import { type NationType, type EditingNationType } from '../types/Nation';
import type { NationIdType } from '../types/Nation';

export type StartNationCreationAction = { +type: 'START_NATION_CREATION' };
export type StartNationEditingAction = { +type: 'START_NATION_EDITING', +nation: NationType };
export type ResetNationCreationAction = { +type: 'RESET_NATION_CREATION' };
export type EditingNationFieldChangeAction = {
  +type: 'EDITING_NATION_FIELD_CHANGE',
  +field: string,
  +payload: any,
};
export type CancelNationCreationAction = { +type: 'CANCEL_NATION_CREATE' };
export type SaveNationDraftAction = {
  +type: 'SAVE_NATION_DRAFT',
  +nation: EditingNationType,
  +callback: () => void,
};
export type DeleteNationDraftAction = {
  +type: 'DELETE_NATION_DRAFT',
  +nationId: NationIdType,
  +callback: () => void,
};
export type SubmitNationAction = {
  +type: 'SUBMIT_NATION',
  +nation: EditingNationType,
  +callback: () => void,
};
export type NationDraftSaveResultAction = {
  +type: 'NATION_DRAFT_SAVE_FINISHED',
  +nationId: ?NationIdType,
  +error: ?Error,
};
export type NationDraftDeleteResultAction = {
  +type: 'NATION_DRAFT_DELETE_FINISHED',
  +nationId: NationIdType,
  +error: ?Error,
};
export type NationSubmitResultAction = {
  +type: 'NATION_SUBMIT_FINISHED',
  +nationId: ?NationIdType,
  +error: ?Error,
};

export type Action =
  | StartNationCreationAction
  | StartNationEditingAction
  | ResetNationCreationAction
  | EditingNationFieldChangeAction
  | CancelNationCreationAction
  | SaveNationDraftAction
  | DeleteNationDraftAction
  | SubmitNationAction
  | NationDraftSaveResultAction
  | NationDraftDeleteResultAction
  | NationSubmitResultAction;

export const START_NATION_CREATION = 'START_NATION_CREATION';
export const START_NATION_EDITING = 'START_NATION_EDITING';
export const CANCEL_NATION_CREATE = 'CANCEL_NATION_CREATE';
export const RESET_NATION_CREATION = 'RESET_NATION_CREATION';
export const EDITING_NATION_FIELD_CHANGE = 'EDITING_NATION_FIELD_CHANGE';
export const SAVE_NATION_DRAFT = 'SAVE_NATION_DRAFT';
export const DELETE_NATION_DRAFT = 'DELETE_NATION_DRAFT';
export const SUBMIT_NATION = 'SUBMIT_NATION';
export const NATION_DRAFT_SAVE_FINISHED = 'NATION_DRAFT_SAVE_FINISHED';
export const NATION_DRAFT_DELETE_FINISHED = 'NATION_DRAFT_DELETE_FINISHED';
export const NATION_SUBMIT_FINISHED = 'NATION_SUBMIT_FINISHED';

/**
 * @desc Action creator for an action that should be called on start of nation creation process.
 * @returns {StartNationCreationAction} An action.
 */
export function startNationCreation(): StartNationCreationAction {
  return {
    type: START_NATION_CREATION,
  };
}

/**
 * @desc Action creator for an action that should be called on start of nation editing process.
 * @param {NationType} nation Nation to edit.
 * @returns {StartNationEditingAction} An action.
 */
export function startNationEditing(nation: NationType): StartNationEditingAction {
  return {
    type: START_NATION_EDITING,
    nation,
  };
}

/**
 * @desc Action creator for an action that resets currently modified nation to its initial
 * state.
 * @returns {ResetNationCreationAction} An action.
 */
export function resetNationCreation(): ResetNationCreationAction {
  return {
    type: RESET_NATION_CREATION,
  };
}

/**
 * @desc Action creator for an action that changes field of currently modified nation.
 * @param {string} field Name of field to be changed.
 * @param {any} data Value of field to be changed.
 * @returns {EditingNationFieldChangeAction} An action.
 */
export function editingNationFieldChange(field: string, data: any): EditingNationFieldChangeAction {
  return {
    type: EDITING_NATION_FIELD_CHANGE,
    payload: data,
    field,
  };
}

/**
 * @desc Action creator for an action that cancels nation creation process.
 * @returns {CancelNationCreationAction} An action.
 */
export function cancelNationCreation(): CancelNationCreationAction {
  return {
    type: CANCEL_NATION_CREATE,
  };
}

/**
 * @desc Action creator for an action that starts draft save.
 * @param {EditingNationType} nation Nation data to be saved or draft to be updated.
 * @param {function} callback Callback to be called when save is finished.
 * @returns {SaveNationDraftAction} An action.
 */
export function saveNationDraft(
  nation: EditingNationType,
  callback: () => void,
): SaveNationDraftAction {
  return {
    type: SAVE_NATION_DRAFT,
    nation,
    callback,
  };
}

/**
 * @desc Action creator for an action that starts draft delete.
 * @param {number} nationId Id of draft to be deleted.
 * @param {function} callback Callback to be called when delete is finished.
 * @returns {DeleteNationDraftAction} An action.
 */
export function deleteNationDraft(
  nationId: number,
  callback: () => void,
): DeleteNationDraftAction {
  return {
    type: DELETE_NATION_DRAFT,
    nationId,
    callback,
  };
}

/**
 * @desc Action creator for an action that starts nation submit.
 * @param {EditingNationType} nation Nation data or draft to be submitted.
 * @param {function} callback Callback to be called when submit is finished.
 * @returns {SubmitNationAction} An action.
 */
export function submitNation(
  nation: EditingNationType,
  callback: () => void,
): SubmitNationAction {
  return {
    type: SUBMIT_NATION,
    nation,
    callback,
  };
}

/**
 * @desc Action creator for an action that starts nation submit.
 * @param {number} nationId Id of nation that is save relates to.
 * @param {Error=} error Error if any.
 * @returns {NationDraftSaveResultAction} An action.
 */
export function nationDraftSaveResult(
  nationId: ?number,
  error: ?Error,
): NationDraftSaveResultAction {
  return {
    type: NATION_DRAFT_SAVE_FINISHED,
    nationId,
    error,
  };
}

/**
 * @desc Action creator for an action that starts nation draft delete.
 * @param {number} nationId Id of nation that is delete relates to.
 * @param {Error=} error Error if any.
 * @returns {NationDraftDeleteResultAction} An action.
 */
export function nationDraftDeleteResult(
  nationId: number,
  error: ?Error,
): NationDraftDeleteResultAction {
  return {
    type: NATION_DRAFT_DELETE_FINISHED,
    nationId,
    error,
  };
}

/**
 * @desc Action creator for an action that starts nation submit.
 * @param {number} nationId Id of nation that is submit relates to.
 * @param {Error=} error Error if any.
 * @returns {NationSubmitResultAction} An action.
 */
export function nationSubmitResult(
  nationId: ?number,
  error: ?Error,
): NationSubmitResultAction {
  return {
    type: NATION_SUBMIT_FINISHED,
    nationId,
    error,
  };
}

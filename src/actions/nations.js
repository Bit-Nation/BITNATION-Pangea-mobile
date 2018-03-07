// @flow

import type { NationIdType, NationType } from '../types/Nation';

export type NationTab = 'ALL_NATIONS' | 'MY_NATIONS';

type SwitchNationTabAction = { +type: 'SWITCH_NATIONS_TAB', +tab: NationTab };
type OpenNationAction = { +type: 'OPEN_NATION', +nationId: NationIdType };
type RequestFetchNationsAction = { +type: 'START_NATIONS_FETCH' };
type JoinNationAction = { +type: 'REQUEST_JOIN_NATION' };
type LeaveNationAction = { +type: 'REQUEST_LEAVE_NATION' };
type DoneFetchNationsAction = { +type: 'DONE_FETCH_NATIONS' };
type DoneSyncNationsAction = { +type: 'DONE_SYNC_NATIONS', +payload: Array<NationType> };

export type Action =
  | SwitchNationTabAction
  | OpenNationAction
  | RequestFetchNationsAction
  | JoinNationAction
  | LeaveNationAction
  | DoneFetchNationsAction
  | DoneSyncNationsAction;

export const SWITCH_NATIONS_TAB = 'SWITCH_NATIONS_TAB';
export const OPEN_NATION = 'OPEN_NATION';
export const START_NATIONS_FETCH = 'START_NATIONS_FETCH';
export const DONE_FETCH_NATIONS = 'DONE_FETCH_NATIONS';
export const CANCEL_LOADING = 'CANCEL_LOADING';
export const REQUEST_JOIN_NATION = 'REQUEST_JOIN_NATION';
export const REQUEST_LEAVE_NATION = 'REQUEST_LEAVE_NATION';
export const DONE_SYNC_NATIONS = 'DONE_SYNC_NATIONS';

/**
 * @desc Action creator for an action that switches nation list filter.
 * @param {NationTab} tab Tab to switch to.
 * @returns {SwitchNationTabAction} An action.
 */
export function switchNationTab(tab: NationTab): SwitchNationTabAction {
  return {
    type: SWITCH_NATIONS_TAB,
    tab,
  };
}

/**
 * @desc Action creator for an action that should be called before show nation details screen.
 * @param {NationIdType} id Id of nation to open.
 * @returns {OpenNationAction} An action.
 */
export function openNation(id: NationIdType): OpenNationAction {
  return {
    type: OPEN_NATION,
    nationId: id,
  };
}

/**
 * @desc Action creator for an action that starts nations fetch.
 * @returns {RequestFetchNationsAction} An action.
 */
export function requestFetchNations(): RequestFetchNationsAction {
  return {
    type: START_NATIONS_FETCH,
  };
}

/**
 * @desc Action creator for an action that starts currently opened nation join.
 * @returns {JoinNationAction} An action.
 */
export function joinNation(): JoinNationAction {
  return {
    type: REQUEST_JOIN_NATION,
  };
}

/**
 * @desc Action creator for an action that starts currently opened nation leave.
 * @returns {LeaveNationAction} An action.
 */
export function leaveNation(): LeaveNationAction {
  return {
    type: REQUEST_LEAVE_NATION,
  };
}

/**
 * @desc Action creator for an action that is called when nations fetch finished.
 * @returns {DoneFetchNationsAction} An action
 */
export function doneFetchNations(): DoneFetchNationsAction {
  return {
    type: DONE_FETCH_NATIONS,
  };
}

/**
 * @desc Action creator for an action that is called when nations sync finished.
 * @param {NationType[]} nations Nations coming from database.
 * @returns {DoneSyncNationsAction} An action.
 */
export function doneSyncNations(nations: Array<NationType>): DoneSyncNationsAction {
  return {
    type: DONE_SYNC_NATIONS,
    payload: nations,
  };
}

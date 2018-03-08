// @flow

import { type ProfileType } from '../types/Profile';

type StartUserCreatingAction = { +type: 'START_USER_CREATING' };
type StartUserEditingAction = { +type: 'START_USER_EDITING' };
type ChangeEditingUserAction = { +type: 'CHANGE_EDITING_USER', +user: ProfileType };
type SetUserProfileAction = { +type: 'SET_USER_PROFILE', +user: ProfileType };
type CancelUserEditingAction = { +type: 'CANCEL_USER_EDITING' };
type DoneUserEditingAction = { +type: 'DONE_USER_EDITING' };
type RequestProfileUpdateAction = { +type: 'REQUEST_PROFILE_UPDATE' };
type GetUserProfileAction = { +type: 'REQUEST_GET_PROFILE' };

export type Action =
  | StartUserCreatingAction
  | StartUserEditingAction
  | ChangeEditingUserAction
  | SetUserProfileAction
  | CancelUserEditingAction
  | DoneUserEditingAction
  | RequestProfileUpdateAction
  | GetUserProfileAction;

export const START_USER_CREATING = 'START_USER_CREATING';
export const START_USER_EDITING = 'START_USER_EDITING';
export const CHANGE_EDITING_USER = 'CHANGE_EDITING_USER';
export const DONE_USER_EDITING = 'DONE_USER_EDITING';
export const CANCEL_USER_EDITING = 'CANCEL_USER_EDITING';
export const SET_USER_PROFILE = 'SET_USER_PROFILE';
export const REQUEST_GET_PROFILE = 'REQUEST_GET_PROFILE';
export const REQUEST_PROFILE_UPDATE = 'REQUEST_PROFILE_UPDATE';

/**
 * @desc Action creator for an action that should be called to start user profile creating.
 * @returns {StartUserCreatingAction} An action.
 */
export function startUserCreating(): StartUserCreatingAction {
  return {
    type: START_USER_CREATING,
  };
}

/**
 * @desc Action creator for an action that should be called to start user profile editing.
 * @returns {StartUserEditingAction} An action.
 */
export function startUserEditing(): StartUserEditingAction {
  return {
    type: START_USER_EDITING,
  };
}

/**
 * @desc Action creator for an action that changes currently edit user with new value.
 * @param {ProfileType} user New user value.
 * @returns {ChangeEditingUserAction} An action.
 */
export function changeEditingUser(user: ProfileType): ChangeEditingUserAction {
  return {
    type: CHANGE_EDITING_USER,
    user,
  };
}

/**
 * @desc Action creator for an action that sets user profile with new value.
 * Used to update profile after fetch from database.
 * @param {ProfileType} user User profile value.
 * @returns {SetUserProfileAction} An action.
 */
export function setUserProfile(user: ProfileType): SetUserProfileAction {
  return {
    type: SET_USER_PROFILE,
    user,
  };
}

/**
 * @desc Action creator for an action that should be called to cancel user editing.
 * @returns {CancelUserEditingAction} An action.
 */
export function cancelUserEditing(): CancelUserEditingAction {
  return {
    type: CANCEL_USER_EDITING,
  };
}

/**
 * @desc Action creator for an action that should be called on done user editing.
 * @returns {DoneUserEditingAction} An action.
 */
export function doneUserEditing(): DoneUserEditingAction {
  return {
    type: DONE_USER_EDITING,
  };
}

/**
 * @desc Action creator for an action that starts profile SAVE process to database.
 * @returns {RequestProfileUpdateAction} An action.
 */
export function requestProfileUpdate(): RequestProfileUpdateAction {
  return {
    type: REQUEST_PROFILE_UPDATE,
  };
}

/**
 * @desc Action creator for an action that starts profile GET process from database.
 * @returns {GetUserProfileAction} An action.
 */
export function getUserProfile(): GetUserProfileAction {
  return {
    type: REQUEST_GET_PROFILE,
  };
}

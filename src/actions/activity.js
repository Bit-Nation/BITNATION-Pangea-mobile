// @flow

import { type ActivityLogMessage } from '../types/ActivityLogMessage';

export const MESSAGES_UPDATED = 'MESSAGES_UPDATED';
export const ADD_NEW_MESSAGE = 'ADD_NEW_MESSAGE';
export const emptyCallback = () => {};

type MessagesAddedAction = {
  +type: "MESSAGES_UPDATED",
  +messages: Array<ActivityLogMessage>
};
export type AddNewMessageAction = {
  +type: "ADD_NEW_MESSAGE",
  +message: string,
  +params: Object,
  +interpret: boolean,
  +callback: (success: boolean) => void
};

export type Action = MessagesAddedAction | AddNewMessageAction;

/**
 * @desc Action creator for an action that should be called when activity logs messages updated in database.
 * @param {Array<ActivityLogMessage>} messages Updated activity logs.
 * @returns {MessagesAddedAction} An action.
 */
export function messagesUpdated(messages: Array<ActivityLogMessage>): MessagesAddedAction {
  return {
    type: MESSAGES_UPDATED,
    messages,
  };
}

/**
 * @desc Action for an action that adds activity log message.
 * @param {string} message Acitivity message to be logged
 * @param {any} params Additional params to the log
 * @param {boolean} interpret Flag that indicates if the messsage should be interpreted
 * @param {function} callback Function that is after the action is processed
 * @returns {AddNewMessageAction} An action.
 */
export function addNewMessage(
  message: string,
  params?: Object = {},
  interpret?: boolean = true,
  callback?: (boolean) => void,
): AddNewMessageAction {
  return {
    type: ADD_NEW_MESSAGE,
    message,
    params,
    interpret,
    callback: callback || emptyCallback,
  };
}

// @flow

import { type ActivityLogMessage } from '../types/ActivityLogMessage';

export const MESSAGES_ADDED = 'MESSAGES_ADDED';
export const ADD_NEW_MESSAGE = 'ADD_NEW_MESSAGE';
export const emptyCallback = () => {};

type MessagesAddedAction = {
  +type: "MESSAGES_ADDED",
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
 * @desc Action creator for an action that should be called once new activity log message added.
 * @param {Array<ActivityLogMessage>} messages Activity log messages that are added.
 * @returns {MessagesAddedAction} An action.
 */
export function messagesAdded(messages: Array<ActivityLogMessage>): MessagesAddedAction {
  return {
    type: MESSAGES_ADDED,
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

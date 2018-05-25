// @flow

type CancelConfirmationAction = { +type: 'CANCEL_CONFIRMATION' };
type SendConfirmationAction = { +type: 'SEND_CONFIRMATION' };

export type Action =
  | CancelConfirmationAction
  | SendConfirmationAction;

export const CANCEL_CONFIRMATION = 'CANCEL_CONFIRMATION';
export const SEND_CONFIRMATION = 'SEND_CONFIRMATION';

/**
 * @desc Action creator for an action that cancels confirmation process in transactions.
 * @returns {CancelConfirmationAction} An action.
 */
export function cancelConfirmation(): CancelConfirmationAction {
  return {
    type: CANCEL_CONFIRMATION,
  };
}

/**
 * @desc Action creator for an action that cancels confirmation process in transactions.
 * @returns {CancelConfirmationAction} An action.
 */
export function sendConfirmation(): SendConfirmationAction {
  return {
    type: SEND_CONFIRMATION,
  };
}

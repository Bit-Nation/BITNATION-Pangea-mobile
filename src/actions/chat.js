export const SHOW_CHAT_SPINNER = 'SHOW_CHAT_SPINNER';
export const HIDE_CHAT_SPINNER = 'HIDE_CHAT_SPINNER';

type ShowSpinnerAction = { +type: 'SHOW_CHAT_SPINNER' };
type HideSpinnerAction = { +type: 'HIDE_CHAT_SPINNER' };

export type Action =
  | ShowSpinnerAction
  | HideSpinnerAction;

/**
 * @desc Action for an action that shows spinner while processing in background
 * @returns {ShowSpinnerAction} An action.
 */
export function showSpinner(): ShowSpinnerAction {
  return {
    type: SHOW_CHAT_SPINNER,
  };
}

/**
 * @desc Action for an action that hide spinner after the process is completed
 * @returns {HideSpinnerAction} An action.
 */
export function hideSpinner(): HideSpinnerAction {
  return {
    type: HIDE_CHAT_SPINNER,
  };
}

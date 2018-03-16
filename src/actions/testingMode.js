// @flow

type MakeStepAction = { +type: 'MAKE_STEP' };
type ResetStepsAction = { +type: 'RESET_STEPS' };
type EmptyWalletAction = { +type: 'EMPTY_WALLET' };

export type Action =
  | MakeStepAction
  | ResetStepsAction
  | EmptyWalletAction;

export const MAKE_STEP = 'MAKE_STEP';
export const RESET_STEPS = 'RESET_STEPS';
export const EMPTY_WALLET = 'EMPTY_WALLET';

/**
 * @desc Action creator for make step action.
 * That action is used to toggle activation of testing mode.
 * Specifically, each toggling requires several (fixed amount of) steps to be made.
 * @returns {MakeStepAction} An action.
 */
export function makeStep(): MakeStepAction {
  return {
    type: MAKE_STEP,
  };
}

/**
 * @desc Action creator for reset steps action.
 * That action is used to reset activation of testing mode.
 * Resets number of steps made to initial value.
 * @returns {ResetStepsAction} An action.
 */
export function resetSteps(): ResetStepsAction {
  return {
    type: RESET_STEPS,
  };
}

/**
 * @desc Action creator for empty wallet action.
 * That action is used to toggle walletEmpty prop.
 * @returns {EmptyWalletAction} An action.
 */
export function emptyWallet(): EmptyWalletAction {
  return {
    type: EMPTY_WALLET,
  };
}

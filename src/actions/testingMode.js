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
 * @desc Action creator for an action that makes one step of switching testing mode on/off.
 * @returns {MakeStepAction} An action.
 */
export function makeStep(): MakeStepAction {
  return {
    type: MAKE_STEP,
  };
}

/**
 * @desc Action creator for an action that resets steps of switching testing mode on/off.
 * @returns {ResetStepsAction} An action.
 */
export function resetSteps(): ResetStepsAction {
  return {
    type: RESET_STEPS,
  };
}

/**
 * @desc Action creator for an action that changes testing flag that means
 * if the wallets list should be considered empty.
 * @returns {EmptyWalletAction} An action.
 */
export function emptyWallet(): EmptyWalletAction {
  return {
    type: EMPTY_WALLET,
  };
}

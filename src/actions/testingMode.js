export const MAKE_STEP = 'MAKE_STEP';
export const RESET_STEPS = 'RESET_STEPS';
export const EMPTY_WALLET = 'EMPTY_WALLET';

/**
 * @desc Action creator for make step action.
 * That action is used to toggle activation of testing mode.
 * Specifically, each toggling requires several (fixed amount of) steps to be made.
 * @returns An action.
 */
export function makeStep() {
  return {
    type: MAKE_STEP,
  };
}

/**
 * @desc Action creator for reset steps action.
 * That action is used to reset activation of testing mode.
 * Resets number of steps made to initial value.
 * @returns An action.
 */
export function resetSteps() {
  return {
    type: RESET_STEPS,
  };
}

/**
 * @desc Action creator for empty wallet action.
 * That action is used to toggle walletEmpty prop.
 * @returns An action.
 */
export function emptyWallet() {
  return {
    type: EMPTY_WALLET,
  };
}
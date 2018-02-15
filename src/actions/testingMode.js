export const MAKE_STEP = 'MAKE_STEP';
export const RESET_STEPS = 'RESET_STEPS';
export const EMPTY_WALLET = 'EMPTY_WALLET';

export function makeStep() {
  return {
    type: MAKE_STEP,
  };
}

export function resetSteps() {
  return {
    type: RESET_STEPS,
  };
}

export function emptyWallet() {
  return {
    type: EMPTY_WALLET,
  };
}
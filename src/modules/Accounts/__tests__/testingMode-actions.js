import {
  EMPTY_WALLET,
  MAKE_STEP,
  RESET_STEPS,
  emptyWallet,
  makeStep,
  resetSteps,
} from '../testingMode-actions.js';

describe('testing mode action creators', () => {
  test('makeStep', () => {
    expect(makeStep()).toEqual({
      type: MAKE_STEP,
    });
  });

  test('resetSteps', () => {
    expect(resetSteps()).toEqual({
      type: RESET_STEPS,
    });
  });

  test('emptyWallet', () => {
    expect(emptyWallet()).toEqual({
      type: EMPTY_WALLET,
    });
  });
});

import reducer, { initialState, stepsCountToToggle } from '../../../src/reducers/testingMode';
import { makeStep, emptyWallet, resetSteps } from '../../../src/actions/testingMode';

test('testing mode initial state contains correct number of step left', () => {
  expect(initialState).toEqual(expect.objectContaining({ stepsLeftToToggle: stepsCountToToggle }));
});

test('testing mode initial state has isActive set to false', () => {
  expect(initialState).toEqual(expect.objectContaining({ isActive: false }));
});

describe('testing mode reducer action handling', () => {
  test('resetSteps', () => {
    const stateBefore = { initialState, stepsLeftToToggle: stepsCountToToggle - 1 };
    const stateAfter = reducer(stateBefore, resetSteps());
    expect(stateAfter).toEqual({
      ...stateBefore,
      stepsLeftToToggle: stepsCountToToggle,
    });
  });

  describe('emptyWallet', () => {
    const testChangeWalletEmptyTo = (value) => {
      const stateBefore = { ...initialState, walletEmpty: !value };
      const stateAfter = reducer(stateBefore, emptyWallet());
      expect(stateAfter).toEqual({
        ...stateBefore,
        walletEmpty: value,
      });
    };

    test('walletEmpty changed to false', () => {
      testChangeWalletEmptyTo(false);
    });

    test('walletEmpty changed to true', () => {
      testChangeWalletEmptyTo(true);
    });
  });

  describe('makeStep', () => {
    const testChangeIsActiveTo = (value) => {
      const stateBefore = { ...initialState, isActive: !value };
      let stateAfter = stateBefore;
      for (let i = 0; i < stepsCountToToggle; i += 1) {
        stateAfter = reducer(stateAfter, makeStep());
      }
      expect(stateAfter).toEqual({
        ...stateBefore,
        isActive: value,
        stepsLeftToToggle: stepsCountToToggle,
      });
    };

    test('change is active to true after stepsCountToToggle steps', () => {
      testChangeIsActiveTo(true);
    });

    test('change is active to false after stepsCountToToggle steps', () => {
      testChangeIsActiveTo(false);
    });

    test('make step decreases stepsLeftToToggle', () => {
      const initialValue = 5;

      const stateBefore = { ...initialState, stepsLeftToToggle: initialValue };
      const stateAfter = reducer(stateBefore, makeStep());
      expect(stateAfter).toEqual({
        ...stateBefore,
        stepsLeftToToggle: initialValue - 1,
      });
    });
  });
});

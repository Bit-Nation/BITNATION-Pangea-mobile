import reducer, { initialState } from '../key-reducers';
import {
  changeEnteredMnemonic,
  changeMnemonicValid,
  validateEnteredMnemonic,
} from '../key-actions';
import { KEY_LENGTH } from 'pangea-common/Constants';
import { servicesDestroyed } from 'pangea-common/serviceContainer-actions';

describe('key reducer action handling', () => {
  const mockMnemonic = new Array(KEY_LENGTH).fill('abc');

  test('after service destroy returns initial state', () => {
    const changedState = reducer(initialState, changeEnteredMnemonic(mockMnemonic));
    expect(reducer(changedState, servicesDestroyed())).toEqual(initialState);
  });

  test('changeEnteredMnemonic', () => {
    const stateBefore = initialState;
    const stateAfter = reducer(stateBefore, changeEnteredMnemonic(mockMnemonic));
    expect(stateAfter).toEqual({
      ...stateBefore,
      enteredMnemonic: mockMnemonic,
    });
  });

  test('validateEnteredMnemonic', () => {
    const stateBefore = initialState;
    const stateAfter = reducer(stateBefore, validateEnteredMnemonic());
    expect(stateAfter).toEqual({
      ...stateBefore,
      mnemonicValid: null,
      mnemonicValidationInProgress: true,
    });
  });

  describe('changeMnemonicValid', () => {
    const testSetToValue = (value) => {
      const stateBefore = initialState;
      const stateAfter = reducer(stateBefore, changeMnemonicValid(value));
      expect(stateAfter).toEqual({
        ...stateBefore,
        mnemonicValid: value,
        mnemonicValidationInProgress: false,
      });
    };

    test('set to true', () => {
      testSetToValue(true);
    });

    test('set to false', () => {
      testSetToValue(false);
    });
  });
});

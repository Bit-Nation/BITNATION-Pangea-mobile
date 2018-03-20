import reducer, { initialState } from '../../../src/reducers/key';
import {
  changeEnteredMnemonic,
  changeMnemonicValid,
  createPrivateKey,
  mnemonicCreated,
  removePrivateKey,
  validateEnteredMnemonic,
} from '../../../src/actions/key';
import { KEY_LENGTH } from '../../../src/global/Constants';

describe('key reducer action handling', () => {
  const mockMnemonic = new Array(KEY_LENGTH).fill('abc');

  test('createPrivateKey', () => {
    const stateBefore = initialState;
    const stateAfter = reducer(stateBefore, createPrivateKey());
    expect(stateAfter).toEqual({
      ...stateBefore,
      createdMnemonic: null,
      enteredMnemonic: null,
    });
  });

  test('removePrivateKey', () => {
    const stateBefore = initialState;
    const stateAfter = reducer(stateBefore, removePrivateKey());
    expect(stateAfter).toEqual({
      ...stateBefore,
      createdMnemonic: null,
      enteredMnemonic: null,
    });
  });

  test('mnemonicCreated', () => {
    const stateBefore = initialState;
    const stateAfter = reducer(stateBefore, mnemonicCreated(mockMnemonic));
    expect(stateAfter).toEqual({
      ...stateBefore,
      createdMnemonic: mockMnemonic,
      mnemonicValid: null,
    });
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

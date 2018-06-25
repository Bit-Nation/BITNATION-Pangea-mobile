import { getTypeElementFromText, validateProps } from '../../../../src/utils/dapps/renderer';
import Text from '../../../../src/components/dapps/Text';
import View from '../../../../src/components/dapps/View';
import TextInput from '../../../../src/components/dapps/TextInput';
import Button from '../../../../src/components/dapps/Button';

test('getTypeElementFromText', () => {
  expect(getTypeElementFromText('Text')).toEqual(Text);
  expect(getTypeElementFromText('View')).toEqual(View);
  expect(getTypeElementFromText('TextInput')).toEqual(TextInput);
  expect(getTypeElementFromText('Button')).toEqual(Button);
  expect(getTypeElementFromText('Something unknown')).toBeNull();
});

test('validateProps', () => {
  expect(validateProps(
    {
      allowedNativeProp1: 'ALLOWED_NATIVE_PROP_1',
      allowedNativeProp2: 'ALLOWED_NATIVE_PROP_2',
      disallowedNativeProp3: 'DISALLOWED_NATIVE_PROP_3',
      disabledPath: 'DISABLED',
      onChangeTextPath: 'ON_CHANGE_TEXT',
      badStateBasedPropertyPath: 'BAD_STATE_BASED_PROPERTY',
      onValidChangedPath: 'ON_VALID_CHANGED',
      onPressID: 'ON_PRESS',
      badCallbackID: 'BAD_CALLBACK',
    }, {
      native: ['allowedNativeProp1', 'allowedNativeProp2'],
      stateBased: ['disabled', 'onChangeText'],
      callbacks: ['onPress'],
    },
    'COMPONENT_TYPE',
  )).toEqual({
    nativeProps: {
      allowedNativeProp1: 'ALLOWED_NATIVE_PROP_1',
      allowedNativeProp2: 'ALLOWED_NATIVE_PROP_2',
    },
    stateBasedProps: {
      disabledPath: 'DISABLED',
      onChangeTextPath: 'ON_CHANGE_TEXT',
    },
    callbackProps: {
      onPressID: 'ON_PRESS',
    },
  });
});

import React, { Component } from 'react';

import { TextInput as ReactNativeTextInput } from 'react-native';

export default class TextInput extends Component {
  static validNativeProps = [
    'style',
    'autoCorrect',
    'autoCapitalize',
    'defaultValue',
    'editable',
    'keyboardType',
    'maxLength',
    'multiline',
    'placeholder',
    'placeholderTextColor',
    'secureTextEntry',
    'spellCheck',
  ];

  static stateBasedProps = {
    onChangeText: 'set',
    value: 'get',
  };

  static callbackProps = [
    'onEndEditing',
  ];

  render() {
    return (
      <ReactNativeTextInput {...this.props} />
    );
  }
}

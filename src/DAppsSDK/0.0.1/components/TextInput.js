// @flow

import React, { Component } from 'react';

import { TextInput as ReactNativeTextInput } from 'react-native';

type Props = {
  /**
   * @desc Props that should be passed as they are to backed native component.
   */
  nativeProps: Object,
  /**
   * @desc Callback to be called when entering into text field is done.
   */
  onEndEditing: (text: string) => any,
}

export default class TextInput extends Component<Props, *> {
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

  static callbackProps = [
    'onEndEditing',
  ];

  static defaultProps = {
    onEndEditing: () => undefined,
  };

  constructor(props: Props) {
    super(props);
    this.state = { value: '' };
  }

  render() {
    return (
      <ReactNativeTextInput
        {...this.props.nativeProps}
        value={this.state.value}
        onChangeText={value => this.setState({ value })}
        onEndEditing={() => this.props.onEndEditing(this.state.value)}
      />
    );
  }
}

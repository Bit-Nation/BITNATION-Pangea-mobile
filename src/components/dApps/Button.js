import React, { Component } from 'react';

import { Button as ReactNativeTextButton } from 'react-native';

export default class Button extends Component {
  static validNativeProps = [
    'style',
    'title',
    'color',
  ];

  static stateBasedProps = {
    disabled: 'get',
  };

  static callbackProps = [
    'onPress',
  ];

  render() {
    return (
      <ReactNativeTextButton {...this.props} />
    );
  }
}

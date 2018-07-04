import React, { Component } from 'react';

import { Text as ReactNativeText } from 'react-native';

export default class Text extends Component {
  static validNativeProps = [
    'style',
    'numberOfLines',
    'ellipsizeMode',
  ];

  render() {
    return (
      <ReactNativeText {...this.props} />
    );
  }
}


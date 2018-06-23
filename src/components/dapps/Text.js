import React, { Component } from 'react';

import { Text as ReactNativeText } from 'react-native';

export default class View extends Component {
  static validNativeProps = [
    'style',
  ];

  render() {
    return (
      <ReactNativeText {...this.props} />
    );
  }
}


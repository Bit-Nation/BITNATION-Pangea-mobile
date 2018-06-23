import React, { Component } from 'react';

import { View as ReactNativeView } from 'react-native';

export default class View extends Component {
  static validNativeProps = [
    'style',
  ];

  render() {
    return (
      <ReactNativeView {...this.props} />
    );
  }
}

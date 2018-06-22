import React, { Component } from 'react';

import { View as ReactNativeView } from 'react-native';

export default class View extends Component {
  static validProps = [
    'style',
  ];

  render() {
    return (
      <ReactNativeView style={this.props.style}>
        {this.props.children}
      </ReactNativeView>
    );
  }
}

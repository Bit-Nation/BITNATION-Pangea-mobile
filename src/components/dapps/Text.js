import React, { Component } from 'react';

import { Text as ReactNativeText } from 'react-native';

export default class View extends Component {
  static validProps = [
    'style',
  ];

  render() {
    return (
      <ReactNativeText style={this.props.style}>
        {this.props.children}
      </ReactNativeText>
    );
  }
}


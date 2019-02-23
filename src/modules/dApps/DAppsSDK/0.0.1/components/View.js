// @flow

import * as React from 'react';

import { View as ReactNativeView } from 'react-native';

type Props = {
  /**
   * @desc Props that should be passed as they are to backed native component.
   */
  nativeProps: Object,
  /**
   * @desc Children components.
   */
  children: React.Node,
}

export default class View extends React.Component<Props> {
  static validNativeProps = [
    'style',
  ];

  render() {
    return (
      <ReactNativeView {...this.props.nativeProps}>
        {this.props.children}
      </ReactNativeView>
    );
  }
}

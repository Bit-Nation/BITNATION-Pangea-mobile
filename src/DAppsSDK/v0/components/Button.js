// @flow

import React, { Component } from 'react';

import { Button as ReactNativeButton } from 'react-native';
import styles from '../../../global/Styles';

type Props = {
  /**
   * @desc Props that should be passed as they are to backed native component.
   */
  nativeProps: Object,
  /**
   * @desc Name of predefined type of component.
   */
  type: string,
  /**
   * @desc Style object.
   */
  style?: Object
}

const types = [
  'transparent',
  'action',
];


export default class Button extends Component<Props> {
  static validNativeProps = [
    'title',
    'color',
    'disabled',
  ];

  static callbackProps = [
    'onPress',
  ];

  static customProps = [
    'type',
    'style',
  ];

  static defaultProps = {
    type: 'body',
  };

  styleForType(type: string) {
    if (types.includes(type) === false) {
      return null;
    }

    return styles[type];
  }

  render() {
    const typeStyle = this.props.type ? this.styleForType(this.props.type) : null;
    if (this.props.type != null && typeStyle == null) {
      console.warn(`Invalid value '${this.props.type}' for 'type' property of 'Button' component`);
    }

    return (
      <ReactNativeButton
        {...this.props.nativeProps}
        style={[typeStyle, this.props.style]}
      />
    );
  }
}

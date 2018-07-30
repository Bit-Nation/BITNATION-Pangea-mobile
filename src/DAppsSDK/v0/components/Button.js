// @flow

import React, { Component } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
} from 'react-native';

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
  style?: Object,
  /**
   * @desc Title of the button.
   */
  title: string,
  /**
   * @desc Set if button should be disabled.
   */
  disabled: boolean,
  /**
   * @desc Callback to be called when button is pressed.
   */
  onPress: () => any,
}

const types = [
  'transparent',
  'action',
];

export default class Button extends Component<Props> {
  static validNativeProps = [
    'disabled',
  ];

  static callbackProps = [
    'onPress',
  ];

  static customProps = [
    'type',
    'title',
    'style',
  ];

  static defaultProps = {
    type: 'transparent',
    disabled: false,
    title: '',
    onPress: () => undefined,
  };

  styleForType(type: string) {
    switch (type) {
      case 'transparent':
        return styles.baseButton;
      default:
        return null;
    }
  }

  render() {
    const typeStyle = this.props.type ? this.styleForType(this.props.type) : null;
    if (this.props.type != null && typeStyle == null) {
      console.warn(`Invalid value '${this.props.type}' for 'type' property of 'Button' component`);
    }

    return (

      <View
        style={[
          typeStyle,
          this.props.style,
        ]}
      >
        <TouchableOpacity
          testID='Touchable'
          {...this.props.nativeProps}
          style={[styles.buttonContainer]}
          onPress={() => this.props.onPress()}
        >
          {
            <Text style={[styles.buttonTitle, (this.props.disabled === false) && styles.disabledButtonTitle]}>
              {this.props.title}
            </Text>
          }
        </TouchableOpacity>
      </View>
    );
  }
}

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
   * @desc Style of button title.
   */
  titleStyle?: Object,
  /**
   * @desc Set if button should be disabled.
   */
  disabled: boolean,
  /**
   * @desc Callback to be called when button is pressed.
   */
  onPress: () => any,
}

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
    'titleStyle',
  ];

  static defaultProps = {
    type: 'transparent',
    disabled: false,
    title: '',
    onPress: () => undefined,
  };

  rootStyleForType(type: string) {
    switch (type) {
      case 'transparent':
        return styles.baseButton;
      case 'action':
        return styles.actionButton;
      case 'custom':
        return null;
      default:
        return undefined;
    }
  }

  titleStyleForType(type: string) {
    switch (type) {
      case 'transparent':
        return styles.buttonTitle;
      case 'action':
        return styles.actionButtonTitle;
      case 'custom':
        return null;
      default:
        return undefined;
    }
  }

  render() {
    const typeStyle = this.rootStyleForType(this.props.type);
    if (typeStyle === undefined) {
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
            <Text style={[this.titleStyleForType(this.props.type), this.props.nativeProps.disabled ? styles.disabledButtonTitle : null, this.props.titleStyle]}>
              {this.props.title}
            </Text>
          }
        </TouchableOpacity>
      </View>
    );
  }
}

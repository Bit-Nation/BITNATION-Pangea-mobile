// @flow

import * as React from 'react';
import { Text as ReactNativeText } from 'react-native';

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
   * @desc Children components.
   */
  children: React.Node,
}

const types = [
  'largeTitle',
  'title1',
  'title2',
  'title3',
  'headline',
  'body',
  'bodyBold',
  'bodyBoldBlack',
  'bodyBoldBlackSmall',
  'bodyBlack',
  'callout',
  'subhead',
  'footnote',
  'caption1',
  'caption2',
  'disabledText',
];

export default class Text extends React.Component<Props> {
  static validNativeProps = [
    'numberOfLines',
    'ellipsizeMode',
  ];

  static customProps = [
    'style',
    'type',
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
      console.warn(`Invalid value '${this.props.type}' for 'type' property of 'Text' component`);
    }

    return (
      <ReactNativeText
        {...this.props.nativeProps}
        style={[typeStyle, this.props.style]}
      >
        {this.props.children}
      </ReactNativeText>
    );
  }
}


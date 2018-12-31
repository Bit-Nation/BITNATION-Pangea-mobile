// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import CardSquare from './Square';
import styles from './styles';

export default class Card extends Component {
  static Square = CardSquare;

  render() {
    const { style, children } = this.props;
    return <View style={[styles.card, style]}>{children}</View>;
  }
}

Card.propTypes = {
  style: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Card.defaultProps = {
  style: {},
  children: null,
};

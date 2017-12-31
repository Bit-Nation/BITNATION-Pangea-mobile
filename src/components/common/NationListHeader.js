import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import { MediaQueryStyleSheet } from 'react-native-responsive';

export default class NationListHeader extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {this.props.title}
        </Text>
      </View>
    );
  }

}

const styles = MediaQueryStyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EFEFF4',
    opacity: 0.5,
  },
  text: {
    flex: 1,
    marginLeft: 15,
    color: '#6D6D72',
    fontSize: 13,
  },
});

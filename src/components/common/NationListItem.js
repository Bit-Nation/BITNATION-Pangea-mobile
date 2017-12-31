import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import { MediaQueryStyleSheet } from 'react-native-responsive';

export default class NationListItem extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {this.props.text}
        </Text>
      </View>
    );
  }

}

const styles = MediaQueryStyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  text: {
    flex: 1,
    marginLeft: 15,
    color: 'white',
    fontSize: 17,
  },
});

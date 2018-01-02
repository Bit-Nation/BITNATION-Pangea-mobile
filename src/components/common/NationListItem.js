import React, { Component } from 'react';
import { View, Text, TouchableOpacity, } from 'react-native';
import PropTypes from 'prop-types';
import { MediaQueryStyleSheet } from 'react-native-responsive';

export default class NationListItem extends Component {

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.props.onPress(this.props.item.id)} style={styles.touchable}>
          <Text style={styles.text}>
            {this.props.text}
          </Text>
        </TouchableOpacity>
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
  touchable: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    flex: 1,
    marginLeft: 15,
    color: 'white',
    fontSize: 17,
  },
});

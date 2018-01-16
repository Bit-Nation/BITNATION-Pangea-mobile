import React, { Component } from 'react';
import { View, Text, TouchableOpacity, } from 'react-native';
import PropTypes from 'prop-types';
import { MediaQueryStyleSheet } from 'react-native-responsive';

import GlobalStyles from '../../global/Styles';

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
  ...GlobalStyles,

  container: {
    ...GlobalStyles.sectionListItemContainer,
  },

  touchable: {
    ...GlobalStyles.sectionListTouchable,
  },

  text: {
    ...GlobalStyles.listItemText,
  },
});

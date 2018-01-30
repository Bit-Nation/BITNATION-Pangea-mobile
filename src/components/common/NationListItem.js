import React, { Component } from 'react';
import { View, Text, TouchableOpacity, } from 'react-native';
import PropTypes from 'prop-types';
import { MediaQueryStyleSheet } from 'react-native-responsive';

import GlobalStyles from '../../global/Styles';

export default class NationListItem extends Component {

  render() {
    return (
      <View style={styles.sectionListItemContainer}>
        <TouchableOpacity onPress={() => this.props.onPress(this.props.item.id)} style={styles.sectionListTouchable}>
          <Text style={styles.listItemText}>
            {this.props.text}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

}

NationListItem.propTypes = {
  text: PropTypes.string,
  item: PropTypes.object,
};

const styles = MediaQueryStyleSheet.create({
  ...GlobalStyles,
});

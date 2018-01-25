import React, { Component } from 'react';
import { View, Text, } from 'react-native';
import PropTypes from 'prop-types';
import { MediaQueryStyleSheet } from 'react-native-responsive';
import Colors from '../../global/Colors';
import GlobalStyles from '../../global/Styles';

export default class NationListHeader extends Component {

  render() {
    return (
      <View style={styles.sectionListHeaderContainer}>
        <Text style={styles.sectionListHeaderText}>
          {this.props.title}
        </Text>
      </View>
    );
  }

}

const styles = MediaQueryStyleSheet.create({
  ...GlobalStyles,

});

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { MediaQueryStyleSheet } from 'react-native-responsive';

import GlobalStyles from '../../global/Styles';

/**
 * @desc Component for section header in nations list.
 * @type React.Component
 */
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

NationListHeader.propTypes = {
  /**
   * @desc Title of header
   * @type string
   */
  title: PropTypes.string,
};

const styles = MediaQueryStyleSheet.create({
  ...GlobalStyles,
});

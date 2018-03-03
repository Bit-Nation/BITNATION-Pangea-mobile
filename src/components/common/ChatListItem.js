import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import { MediaQueryStyleSheet } from 'react-native-responsive';

import GlobalStyles from '../../global/Styles';
import AssetsImages from '../../global/AssetsImages';

/**
 * @desc Component that renders nations list item.
 * @type React.Component
 */
export default class ChatListItem extends Component {
  render() {
    return (
      <View style={styles.sectionListItemContainer}>
        <TouchableOpacity
          testID='Touchable'
          onPress={() => this.props.onPress(this.props.id)}
          style={styles.sectionListTouchable}
        >
          <Text style={[styles.listItemText, this.props.textStyle]} numberOfLines={1}>
            {this.props.text}
          </Text>
          <Image source={AssetsImages.disclosureRowIcon} style={styles.sectionListDisclosure} />
        </TouchableOpacity>
      </View>
    );
  }
}

ChatListItem.propTypes = {
  /**
   * @desc Text to display on item
   * @type string
   */
  text: PropTypes.string,

  /**
   * @desc Style object for basic text style
   * @type object
   */
  textStyle: PropTypes.object,

  /**
   * @desc Status of the Nation to display on item
   * @type string
   */
  status: PropTypes.string,
  /**
   * @desc Id that will be passed in onPress callback.
   * @type string
   */
  id: PropTypes.any,
  /**
   * @desc Callback on press item.
   * @type string
   */
  onPress: PropTypes.func,
};

ChatListItem.defaultProps = {
  text: '',
  onPress: () => null,
};

const styles = MediaQueryStyleSheet.create({
  ...GlobalStyles,
});

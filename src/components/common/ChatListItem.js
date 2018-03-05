/**
 * @desc Component that renders Chat Nations list item.
 * @type React.Component
 */

import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import { MediaQueryStyleSheet } from 'react-native-responsive';

import GlobalStyles from '../../global/Styles';
import AssetsImages from '../../global/AssetsImages';

const styles = MediaQueryStyleSheet.create({
  ...GlobalStyles,
});

const ChatListItem = ({
  text, participants, id, onPress,
}) => (
  <View style={styles.sectionListItemContainer}>
    <TouchableOpacity
      testID='Touchable'
      onPress={() => onPress(id)}
      style={styles.sectionListTouchable}
    >
      <Text style={styles.listItemText} numberOfLines={1}>
        {text}
      </Text>
      <Text style={styles.listItemTextState}>
        {participants}
      </Text>
      <Image source={AssetsImages.disclosureRowIcon} style={styles.sectionListDisclosure} />
    </TouchableOpacity>
  </View>
);

ChatListItem.propTypes = {
  /**
   * @desc Text to display on item
   * @type string
   */
  text: PropTypes.string,
  /**
   * @desc Status of the Nation to display on item
   * @type string
   */
  participants: PropTypes.string,
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
  participants: '',
  id: null,
  onPress: () => null,
};

export default ChatListItem;

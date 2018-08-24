// @flow

/**
 * @desc Component that renders Chat Nations list item.
 * @type React.Component
 */

import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';

import GlobalStyles from '../../global/Styles';
import AssetsImages from '../../global/AssetsImages';
import { imageSource } from '../../utils/profile';

type Props = {
  /**
  * @desc Text to display on item
  */
  text: string,
  /**
   * @desc Number of participants in the chat to be displayed.
   */
  participants: string,
  /**
   * @desc Id that will be passed in onPress callback.
   */
  id: any,
  /**
   * @desc Callback on press item.
   */
  onPress: (any) => void,
  /**
   * @desc Image resource to be displayed as icon.
   */
  itemIcon: number,
  /**
   * @desc Image resource for the profile Image.
   */
  profileImage: string,
}

const styles = MediaQueryStyleSheet.create({
  ...GlobalStyles,
});

const ChatListItem = ({
  text, participants, id, onPress, itemIcon, profileImage,
}: Props) => (
  <View style={styles.sectionListItemContainer}>
    <TouchableOpacity
      testID='Touchable'
      onPress={() => onPress(id)}
      style={styles.sectionListTouchable}
    >
      <Image source={AssetsImages.ChatUI.newMsgIcon} style={styles.sectionListNewMessage} />
      <Image
        style={styles.avatarSmall}
        source={imageSource(profileImage) || AssetsImages.avatarIcon}
      />
      <Text style={styles.listItemText} numberOfLines={1}>
        {text}
      </Text>
      <Image source={itemIcon} style={styles.sectionListSignal} />
      <Text style={styles.listItemTextState}>
        {participants}
      </Text>
      <Image source={AssetsImages.disclosureRowIcon} style={styles.sectionListDisclosure} />
    </TouchableOpacity>
  </View>
);

ChatListItem.defaultProps = {
  text: '',
  participants: '',
  id: null,
  onPress: () => null,
  itemIcon: 0,
  profileImage: '',
};

export default ChatListItem;

// @flow

/**
 * @desc Component that renders chat list item.
 * @type React.Component
 */

import React from 'react';
import { Image } from 'react-native';

import ListItem from './ListItem';
import GlobalStyles from '../../global/Styles';

type Props = {
  /**
  * @desc Name of chat partner.
  */
  name: string,
  /**
   * @desc Last message to show on preview.
   */
  lastMessage?: string | null,
  /**
   * @desc Base64 avatar of partner.
   */
  avatar: Image.propTypes.source,
  /**
   * @desc Id that will be passed in onPress callback.
   */
  id: string,
  /**
   * @desc Callback on press item.
   * @param Id of item that was pressed.
   */
  onPress: (id: string) => void,
}

const ChatListItem = ({
  name, id, onPress, avatar, lastMessage,
}: Props) => (
  <ListItem
    id={id}
    text={name}
    textStyle={GlobalStyles.chatTitleStyle}
    onPress={onPress}
    iconSource={avatar}
    style={GlobalStyles.itemWithSubtitle}
    subtitle={lastMessage}
  />
);

ChatListItem.defaultProps = {
  partnerName: '',
  onPress: () => null,
  partnerAvatar: null,
  lastMessage: undefined,
};

export default ChatListItem;
